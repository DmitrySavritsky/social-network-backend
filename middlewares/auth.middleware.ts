import jwt from "jsonwebtoken";
import { TokenInterface } from "../models/types";
import UserSchema from "../models/user.model";

async function isUserExists(login: string, request: Express.Request) {
  const user = await UserSchema.findOne({ name: login });
  if (user !== null) {
    request.currentUser = user;
    return true;
  } else return false;
}

const auth = async function (
  req: Express.Request,
  res: Express.Response,
  next: any
) {
  try {
    const [strategy, token] = req.headers.authorization.split(" ");
    const result = jwt.verify(token, "veryStrongSecretKey");
    const login = (result as TokenInterface).login;
    req.login = login;

    const isExists = await isUserExists(login, req);
    if (!isExists) {
      throw new Error("User not exists!");
    }
    next();
  } catch (err) {
    res.status(403).send(err.message);
  }
};

module.exports = auth;
