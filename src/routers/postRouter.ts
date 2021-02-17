import * as express from "express";
import auth from "../middlewares/auth.middleware";
import postController from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/", auth, postController.getPosts);
postRouter.get("/friendsPosts", auth, postController.getFriendsPosts);
postRouter.get("/:id", auth, postController.getCurrentPost);
postRouter.post("/", auth, postController.addPost);
postRouter.post("/likes", auth, postController.likePost);
postRouter.put("/:id", auth, postController.updatePost);
postRouter.delete("/:id", auth, postController.deletePost);

export default postRouter;
