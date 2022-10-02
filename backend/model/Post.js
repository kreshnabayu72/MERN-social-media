import mongoose from "mongoose";
import { userSchema } from "./User.js";

const postSchema = mongoose.Schema({
  user: userSchema,
  image: { type: Buffer, default: null },
  time: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: String,
});

postSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

export const postModel = mongoose.model("Post", postSchema);
