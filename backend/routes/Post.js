import express from "express";
import { postModel } from "../model/Post.js";
import { userModel } from "../model/User.js";
import multer from "multer";
import * as path from "path";
import Joi from "joi";

const router = express.Router();

const upload = multer({
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("/", async (req, res) => {
  const result = await postModel.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id/image", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.contentType("image/jpeg");
    res.send(post.image);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const postValidation = Joi.object().keys({
    userId: Joi.string().required(),
    description: Joi.string(),
    image: Joi.allow(),
  });

  try {
    if (!req.file) {
      throw new Error("No image selected");
    }

    await postValidation.validateAsync(req.body);

    if (req.fileValidationError) {
      throw new Error("File is not an image");
    }

    const user = await userModel.findById(req.body.userId);
    const newPost = new postModel({
      user: user,
      description: req.body.description,
      image: req.file.buffer,
    });

    const result = await newPost.save();

    res.send(result);
  } catch (error) {
    if (error.details) {
      res.status(422).send({ error: error.details[0].message });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

router.put("/:id/like", async (req, res) => {
  const parseAndStringify = (string) => {
    return JSON.parse(JSON.stringify(string));
  };
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    const user = await userModel.findOne({ _id: req.body.userId });

    const postLikesJSON = parseAndStringify(post.likes);

    if (postLikesJSON.includes(parseAndStringify(user._id))) {
      const result = await post.updateOne({
        $pull: { likes: user._id },
      });
      res.send({ result, message: "disliked" });
    } else {
      const result = await post.updateOne({
        $addToSet: { likes: user._id },
      });
      res.send({ result, message: "liked" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = postModel.findOne({ _id: req.params.id });
    const result = await post.deleteOne();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

export default router;
