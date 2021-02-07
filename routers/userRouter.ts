
import * as express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userController.get);

export default userRouter;