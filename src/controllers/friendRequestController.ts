import * as express from "express";
import { IFriendRequest } from "../models/types";
import friendRequestService from "../services/friendRequest.service";

class FriendRequestController {
  async addFriendRequest(req: express.Request, res: express.Response) {
    try {
      if (req.id !== undefined) {
        const friendRequest: IFriendRequest = {
          fromId: req.id,
          toId: req.body.friendId,
        };

        res
          .send(await friendRequestService.addFriendRequest(friendRequest))
          .status(202);
      } else throw new Error("No id in request!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getFriendRequests(req: express.Request, res: express.Response) {
    try {
      if (req.id !== undefined) {
        res
          .send(await friendRequestService.getFriendRequests(req.id))
          .status(202);
      } else throw new Error("No id in request!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default new FriendRequestController();
