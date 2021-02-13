import * as express from "express";
import friendRequestController from "../controllers/friendRequestController";
import auth from "../middlewares/auth.middleware";

const friendRequestRouter = express.Router();

friendRequestRouter.post("/",auth, friendRequestController.addFriendRequest);
friendRequestRouter.get("/",auth, friendRequestController.getFriendRequests);

export default friendRequestRouter;