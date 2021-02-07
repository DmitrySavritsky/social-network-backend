import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface TokenInterface {
  id: string;
  login: string;
}
