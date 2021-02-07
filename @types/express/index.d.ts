import { IUser, LoginData } from "../../models/types";

declare global {
  namespace Express {
    interface Request {
      loginData: LoginData;
      currentUser: IUser;
      login: string;
      headers: {
        authorization: string;
      };
    }

    interface Response {
      status: (code: number) => Response;
      send: (s: string) => any;
    }
  }
}
