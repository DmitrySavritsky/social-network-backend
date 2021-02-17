import { model, Schema, Document } from "mongoose";
import { IComment } from "./types";

const commentSchema: Schema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

interface ICommentDoc extends IComment, Document {}

const Comment = model<ICommentDoc>("Comment", commentSchema);

export default Comment;
