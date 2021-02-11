import bcrypt from "bcrypt";
import UserSchema, { IUserDoc } from "../models/user.model";
import { Types } from "mongoose";
import { IUser } from "../models/types";
import jwt from "jsonwebtoken";

async function createHash(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function checkPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

class UserService {
  constructor() {}

  async getUsers() {
    return await UserSchema.find({});
  }

  async findUser(login: string): Promise<IUserDoc> {
    return await UserSchema.findOne({ login: login });
  }

  async findUserById(id: Types.ObjectId): Promise<IUserDoc> {
    return await UserSchema.findOne({ _id: id });
  }

  async userExists(login: string) {
    const user = await UserSchema.findOne({ login: login });
    return user !== null;
  }

  async addUser(user: IUser): Promise<string> {
    const addedUser = new UserSchema({
      ...user,
      password: await createHash(user.password as string),
    });
    await addedUser.save();
    return "User added successfully!";
  }

  async login(login: string, password: string): Promise<String> {
    const user = await this.findUser(login);
    if (user === null) {
      throw new Error("User not found in db!");
    }

    const isMatch = await checkPassword(password, user.password as string);

    if (!isMatch) {
      throw new Error("Password mismatch!");
    } else {
      const token = jwt.sign({ id: user._id, login }, "veryStrongSecretKey", {
        expiresIn: "1h",
      });
      return token;
    }
  }

  async signUp(newUser: IUser): Promise<string> {
    const user = await this.findUser(newUser.login as string);
    if (user !== null) {
      throw new Error("Duplicate login!");
    }
    return await this.addUser(newUser);
  }

  async getCurrentUserInfo(userId: Types.ObjectId) {
    const user = await this.findUserById(userId);
    if (user === null) {
      throw new Error("Current user does not exist!");
    }
    return {
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    };
  }
}

export default new UserService();
