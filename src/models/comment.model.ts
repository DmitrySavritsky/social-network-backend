import { model, Schema, Document } from "mongoose";
import { IComment } from "./types";

const commentSchema: Schema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
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
});

interface ICommentDoc extends IComment, Document {}

const Comment = model<ICommentDoc>("Comment", commentSchema);

export default Comment;
