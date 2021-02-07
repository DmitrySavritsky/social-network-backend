import { model, Model, Schema } from "mongoose";

import { IUser } from "./types";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = model("User", userSchema);

export default User;
