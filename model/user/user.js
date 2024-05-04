import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
});

export const User = models.User || model("User", userSchema);
