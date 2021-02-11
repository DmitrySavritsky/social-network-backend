import { model, Schema, Document } from "mongoose";
import { IPost } from "./types";

const postSchema: Schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export interface IPostDoc extends IPost, Document {}

const Post = model<IPostDoc>("Post", postSchema);

export default Post;
