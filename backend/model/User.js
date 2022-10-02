import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: Buffer, default: null },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isAdmin: { type: Boolean },
});

userSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.profilePicture;
  return result;
};

export const userModel = mongoose.model("User", userSchema);
