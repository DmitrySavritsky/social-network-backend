import * as express from "express";
import { UserNameData } from "../models/types";
import UserService from "../services/user.service";

class UserController {
  async getCurrentUserInfo(req: express.Request, res: express.Response) {
    try {
      if (req.id !== undefined) {
        res.send(await UserService.getCurrentUserInfo(req.id)).status(200);
      } else throw new Error("User id is undefined!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async changeCurrentUserName(req: express.Request, res: express.Response) {
    try {
      if (req.id !== undefined) {
        const user = req.body as UserNameData;
        res.send(await UserService.changeCurrentUserName(user, req.id)).status(200);
      } else throw new Error("User id is undefined!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default new UserController();
