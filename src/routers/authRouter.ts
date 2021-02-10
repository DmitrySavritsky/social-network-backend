import * as express from "express";
import authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signUp", authController.signUp);

export default authRouter;