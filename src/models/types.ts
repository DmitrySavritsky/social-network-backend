import { Types } from "mongoose";

export interface IPost {
  owner: Types.ObjectId;
  message: String;
  date: Date;
  comments: Array<Types.ObjectId>;
  likes: Array<Types.ObjectId>;
}

export interface IUser {
  login: String;
  password: String;
  firstName: String;
  lastName: String;
  email: String;
  posts: Array<Types.ObjectId>;
  friends: Array<Types.ObjectId>;
  friendRequests: Array<Types.ObjectId>;
}

export interface IMessage {
  ownerId: Types.ObjectId;
  chatId: Types.ObjectId;
  message: String;
  date: Date;
}

export interface IChat {
  chatName: String;
  messages: Array<Types.ObjectId>;
  users: Array<Types.ObjectId>;
}

export interface IComment {
  postId: Types.ObjectId;
  ownerId: Types.ObjectId;
  message: String;
  date: Date;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface PostData {
  message: string;
}

export interface LikeData {
  postId: Types.ObjectId;
}

export interface TokenData {
  id: Types.ObjectId;
  login: string;
}

export interface UserNameData {
  firstName: string;
  lastName: string;
  password: string;
}
