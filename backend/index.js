import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/User.js";
import postRouter from "./routes/Post.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.connect(
  "mongodb+srv://mongodbnew:counter@cluster0.j5wi9.mongodb.net/sosmed?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is on");
});

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("App is on " + port));
