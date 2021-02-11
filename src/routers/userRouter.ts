import * as express from "express";
import auth from "../middlewares/auth.middleware";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/currentUser", auth, userController.getCurrentUserInfo);

export default userRouter;
