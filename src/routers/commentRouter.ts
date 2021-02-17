import * as express from "express";
import commentController from "../controllers/commentController";
import auth from "../middlewares/auth.middleware";

const commentRouter = express.Router();
commentRouter.get("/:id", auth, commentController.getComments);
commentRouter.post("/:id", auth, commentController.addComment);

export default commentRouter;
