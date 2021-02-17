import * as express from "express";
import { Types } from "mongoose";
import CommentService from "../services/comment.service";

class CommentController {
  async getComments(req: express.Request, res: express.Response) {
    try {
      if (req.params.id === undefined) throw new Error("No id in query!");
      const postId = Types.ObjectId(req.params.id as string);
      res.send(await CommentService.getCommentsByPostId(postId)).status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addComment(req: express.Request, res: express.Response) {
    try {
      if (req.params.id === undefined) throw new Error("No id in query!");
      if (req.id === undefined) throw new Error("No id in request!");
      const postId = Types.ObjectId(req.params.id as string);
      const message = req.body.message;
      const owner = req.id;
      res
        .send(await CommentService.addCommentToPost(postId, message, owner))
        .status(202);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default new CommentController();
