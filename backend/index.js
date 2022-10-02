import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import userRouter from "./routes/User.js";
import postRouter from "./routes/Post.js";

const app = express();

mongoose.connect(
  "mongodb+srv://mongodbnew:counter@cluster0.j5wi9.mongodb.net/sosmed?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(5000, () => console.log("App on 5000"));
