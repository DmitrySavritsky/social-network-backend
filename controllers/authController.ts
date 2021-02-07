import * as express from "express";
import { IUser, LoginData } from "../models/types";
import UserService from "../services/user.service";

class AuthController {
  async login(req: express.Request, res: express.Response) {
    try {
      const data = req.body as LoginData;
      res.send({token: await UserService.login(data.login, data.password)}).status(202);
    } catch (err) {
      res.status(err.status).send(err.message);
    }
  }
  async signUp(req: express.Request, res: express.Response) {
    try {
      const signUpData = req.body as IUser;
      res.status(202).send(await UserService.signUp(signUpData));
    } catch (err) {
      res.send(err.message).status(500);
    }
  }
}

export default new AuthController();
