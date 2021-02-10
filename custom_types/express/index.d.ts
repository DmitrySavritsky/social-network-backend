import { IUser, LoginData } from "../../src/models/types";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      loginData?: LoginData;
      currentUser?: IUser;
      login?: string;
      id?: Types.ObjectId;
      headers: {
        authorization?: string;
      };
    }

    interface Response {
      status: (code: number) => Response;
      send: (s: string | object) => any;
    }
  }
}
