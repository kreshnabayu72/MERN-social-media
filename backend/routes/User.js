import express from "express";
import Joi from "joi";
import { userModel } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import * as path from "path";

const upload = multer({
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      req.fileValidationError = "Forbidden extension";
      return callback(null, false, req.fileValidationError);
    }

    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const userValidation = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string().required(),
  profilePicture: Joi.allow(),
  authPassword: Joi.allow(),
});

const router = express.Router();

const JWT_SECRET = "123";

router.get("/", async (req, res) => {
  const result = await userModel.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  try {
    const result = await userModel.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id/image", async (req, res) => {
  try {
    const result = await userModel.findById(req.params.id);
    res.contentType("image/jpeg");
    res.send(result.profilePicture);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    await userValidation.validateAsync(req.body);

    if (req.body.password !== req.body.confirmPassword) {
      throw new Error("Confirm password doesnt match");
    }

    if (req.fileValidationError) {
      throw new Error("File is not an image");
    }

    const userExist = await userModel.findOne({ username: req.body.username });

    if (userExist) {
      throw new Error("Username already taken");
    }

    const hashedPasswrod = await bcrypt.hashSync(req.body.password, 7);

    let newUser = new userModel(req.body);
    newUser.password = hashedPasswrod;

    if (req.file) {
      newUser.profilePicture = req.file.buffer;
    }

    const result = await newUser.save();
    res.send({ success: true, result });
  } catch (error) {
    if (error.details) {
      res.status(422).send({ error: error.details[0].message });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

router.post("/login", upload.single(), async (req, res) => {
  try {
    if (req.body.username === "" || req.body.password === "") {
      throw new Error("Empty Field");
    }

    const user = await userModel.findOne({ username: req.body.username });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(500).send({ error: "Wrong username/password" });
      return;
    }

    const token = await jwt.sign({ user }, JWT_SECRET);
    res.send({ user, token, message: "Successful login" });
  } catch (error) {
    console.log(error);
    if (error.details) {
      res.status(422).send({ error: error.details[0].message });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

router.put("/:id", upload.single("profilePicture"), async (req, res) => {
  try {
    await userValidation.validateAsync(req.body);

    const user = await userModel.findOne({ _id: req.params.id });

    if (req.body.password != req.body.confirmPassword) {
      res.status(500).send({ error: "Confirm Password Doesnt Match" });
      return;
    }

    if (!(await bcrypt.compare(req.body.authPassword, user.password))) {
      res.status(500).send({ error: "Wrong password" });
      return;
    }

    let updatedUser = req.body;
    updatedUser.password = await bcrypt.hashSync(req.body.password, 7);

    if (req.file) {
      updatedUser.profilePicture = req.file.buffer;
    }

    const result = await userModel.updateOne(user, updatedUser, { new: true });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.put("/:id/follow", async (req, res) => {
  const parseAndStringify = (string) => {
    return JSON.parse(JSON.stringify(string));
  };

  try {
    const loggedUser = await userModel.findOne({ _id: req.body.userId });
    const selectedUser = await userModel.findOne({ _id: req.params.id });

    if (
      parseAndStringify(loggedUser._id) === parseAndStringify(selectedUser._id)
    ) {
      res.status(500).send({ error: "cant follow self" });
    }

    const loggedUserFollowing = parseAndStringify(loggedUser.following);

    if (loggedUserFollowing.includes(parseAndStringify(selectedUser._id))) {
      await selectedUser.updateOne({
        $pull: { followers: loggedUser._id },
      });
      const result = await loggedUser.updateOne({
        $pull: { following: selectedUser._id },
      });
      res.send({ result, message: "Unfollow user" });
    } else {
      await selectedUser.updateOne({
        $addToSet: { followers: loggedUser._id },
      });
      const result = await loggedUser.updateOne({
        $addToSet: { following: selectedUser._id },
      });
      res.send({ result, message: "Followed user" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = userModel.findOne({ _id: req.params.id });
    const result = await user.deleteOne();
    res.send(result);
  } catch (error) {
    res.send({ error });
  }
});

export default router;
