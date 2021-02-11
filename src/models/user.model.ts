import { model, Schema, Document } from "mongoose";
import { IUser } from "./types";

const userSchema: Schema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  email: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export interface IUserDoc extends IUser, Document {}

const User = model<IUserDoc>("User", userSchema);

export default User;
