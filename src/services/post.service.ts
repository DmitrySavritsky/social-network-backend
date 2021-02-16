import PostSchema, { IPostDoc } from "../models/post.model";
import { IPost } from "../models/types";
import { Types } from "mongoose";
import userService from "./user.service";

class PostService {
  constructor() {}

  async getPostById(id: string) {
    return await PostSchema.find({ _id: id });
  }

  async getPostsByOwnerId(id: Types.ObjectId | undefined) {
    return await PostSchema.find({ owner: id }).sort("-date").populate("owner");
  }

  async findPost(postId: Types.ObjectId) {
    return await PostSchema.findOne({ _id: postId });
  }

  async postExists(postId: string) {
    const post = await PostSchema.findOne({ _id: postId });
    return post !== null;
  }

  async addPost(post: IPost): Promise<string> {
    const addedPost = new PostSchema({
      ...post,
    });
    await addedPost.save();
    return "Post added successfully!";
  }

  async updatePost(
    postId: Types.ObjectId,
    newMessage: string
  ): Promise<string> {
    await PostSchema.updateOne({ _id: postId }, { message: newMessage });
    return "Post updated successfully!";
  }

  async deletePost(postId: Types.ObjectId) {
    await PostSchema.deleteOne({ _id: postId });
    return "Post deleted successfully!";
  }

  async likePost(postId: Types.ObjectId, likeOwnerId: Types.ObjectId) {
    const post: IPostDoc = await this.findPost(postId);
    if (post === null) throw new Error("No post to like!");

    if (post.likes.includes(likeOwnerId)) {
      post.likes = post.likes.filter((x) => x != likeOwnerId);
    } else {
      post.likes.push(likeOwnerId);
    }
    await post.save();
    return "Like changed successfully!";
  }

  async getFriendsPosts(userId: Types.ObjectId){
    const user = await userService.findUserById(userId);
    const friends = user.friends;
    const posts: Array<IPostDoc> = await PostSchema.find({ owner: { $in: friends } }).sort("-date").populate("owner");
    return posts;
  }
}

export default new PostService();
