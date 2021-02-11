import jwt from "jsonwebtoken";
import { IUser, TokenData } from "../models/types";
import UserSchema from "../models/user.model";
import { Request, Response, NextFunction } from "express";

async function isUserExists(login: string, request: Request) {
  const user = (await UserSchema.findOne({ login: login })) as IUser;
  if (user !== null) {
    request.currentUser = user;
    return true;
  } else return false;
}

const auth = async function (req: Request, res: Response, next: NextFunction) {
  try {
    if (req?.headers?.authorization !== undefined) {
      const [strategy, token] = req.headers.authorization.split(" ");
      const result = jwt.verify(token, "veryStrongSecretKey");
      const login = (result as TokenData).login;
      req.login = login;
      req.id = (result as TokenData).id;

      const isExists = await isUserExists(login, req);
      if (!isExists) {
        console.log("No user!");
        throw new Error("User not exists!");
      }
    } else {
      console.log("no header");
      throw new Error("No authorization header exists!");
    }
    next();
  } catch (err) {
    console.log()
    res.status(403).send(err.message);
  }
};

export default auth;
