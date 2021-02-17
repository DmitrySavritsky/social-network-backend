import PostSchema, { IPostDoc } from "../models/post.model";
import { IPost } from "../models/types";
import { Types } from "mongoose";
import userService from "./user.service";
import commentService from "./comment.service";

class PostService {
  constructor() {}

  async getPostById(id: string) {
    return await PostSchema.findOne({ _id: id });
  }

  async getPostsByOwnerId(id: Types.ObjectId | undefined) {
    const posts: Array<IPostDoc> = await PostSchema.find({ owner: id })
      .sort("-date")
      .populate("owner");
    const postsArray = posts.map(async (element: any) => {
      return {
        _id: element._id,
        owner: {
          firstName: element.owner.firstName,
          lastName: element.owner.lastName,
          login: element.owner.login,
          _id: element.owner._id,
        },
        date: element.date,
        message: element.message,
        likes: element.likes,
        commentsCount: await commentService.getCommentsCountByPostId(
          element._id
        ),
      };
    });
    return Promise.all(postsArray);
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

  async getFriendsPosts(userId: Types.ObjectId) {
    const user = await userService.findUserById(userId);
    const friends = user.friends;
    const posts: Array<IPostDoc> = await PostSchema.find({
      owner: { $in: friends },
    })
      .sort("-date")
      .populate("owner");

    const postsArray = posts.map(async (element: any) => {
      return {
        _id: element._id,
        owner: {
          firstName: element.owner.firstName,
          lastName: element.owner.lastName,
          login: element.owner.login,
          _id: element.owner._id,
        },
        date: element.date,
        message: element.message,
        likes: element.likes,
        commentsCount: await commentService.getCommentsCountByPostId(
          element._id
        ),
      };
    });
    return Promise.all(postsArray);
  }

  async getCurrentPostById(postId: Types.ObjectId) {
    const currentPost = await PostSchema.findOne({ _id: postId }).populate(
      "owner"
    );

    return {
      _id: currentPost._id,
      owner: {
        firstName: currentPost.owner.firstName,
        lastName: currentPost.owner.lastName,
        login: currentPost.owner.login,
        _id: currentPost.owner._id,
      },
      date: currentPost.date,
      message: currentPost.message,
      likes: currentPost.likes,
      commentsCount: await commentService.getCommentsCountByPostId(postId),
    };
  }
}

export default new PostService();
