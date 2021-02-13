import * as express from "express";
import auth from "../middlewares/auth.middleware";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/",auth, userController.getUsersList);
userRouter.get("/currentUser", auth, userController.getCurrentUserInfo);
userRouter.post("/currentUser", auth, userController.changeCurrentUserName);

export default userRouter;
