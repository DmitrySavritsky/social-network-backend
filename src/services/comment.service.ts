import CommentSchema from "../models/comment.model";
import { Types } from "mongoose";

class CommentService {
  constructor() {}

  async getCommentsByPostId(postId: Types.ObjectId) {
    return await CommentSchema.find({ post: postId }).populate("post").populate("owner");
  }

  async getCommentsCountByPostId(postId: Types.ObjectId){
    const commentsCount = await CommentSchema.find({ post: postId });
    return commentsCount.length;
  }

  async addCommentToPost(postId: Types.ObjectId, message: string, owner: Types.ObjectId){
    const addedComment = new CommentSchema({
      post: postId,
      owner: owner,
      message: message,
      date: new Date(),
    });
    await addedComment.save();
    return "Comment added successfully!";
  }
}

export default new CommentService();
