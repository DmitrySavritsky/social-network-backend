import { Request, Response } from "express";
import PostService from "../services/post.service";
import { IPost, LikeData } from "../models/types";
import { Types } from "mongoose";

class PostController {
  async getPosts(req: Request, res: Response) {
    try {
      res.send(await PostService.getPostsByOwnerId(req.id)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async addPost(req: Request, res: Response) {
    try {
      if (req.id === undefined) throw new Error("No id present!");
      const post: IPost = {
        owner: req.id,
        message: req.body.message,
        date: new Date(),
        comments: [],
        likes: [],
      };
      res.send(await PostService.addPost(post)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async updatePost(req: Request, res: Response) {
    try {
      if (req.params.id === undefined) throw new Error("No id in query!");
      const postId = Types.ObjectId(req.params.id as string);
      const message = req.body.message;
      res.send(await PostService.updatePost(postId, message)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async deletePost(req: Request, res: Response) {
    try {
      if (req.params.id === undefined) throw new Error("No id in query!");
      const postId = Types.ObjectId(req.params.id as string);
      res.send(await PostService.deletePost(postId)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async likePost(req: Request, res: Response) {
    try {
      if (req.id === undefined) throw new Error("No id present!");
      const likeData = req.body as LikeData;
      res.send(await PostService.likePost(likeData.postId, req.id)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getFriendsPosts(req: Request, res: Response) {
    try {
      if (req.id === undefined) throw new Error("No id present!");
      res.send(await PostService.getFriendsPosts(req.id)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getCurrentPost(req: Request, res: Response) {
    try {
      if (req.params.id === undefined) throw new Error("No id in query!");
      const postId = Types.ObjectId(req.params.id as string);
      res.send(await PostService.getCurrentPostById(postId)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default new PostController();
