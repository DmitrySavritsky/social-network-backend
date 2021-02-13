import FriendRequestSchema from "../models/friendRequest.model";
import { Types } from "mongoose";
import { IFriendRequest } from "../models/types";

class FriendRequestService {
  constructor() {}

  async getFriendRequestById(id: Types.ObjectId) {
    return await FriendRequestSchema.find({ _id: id });
  }

  async containsFriendRequest(fromId: Types.ObjectId, toId: Types.ObjectId) {
    return (
      ((await FriendRequestSchema.find({
        fromId: fromId,
        toId: toId,
      })) as Array<any>).length > 0
    );
  }

  async addFriendRequest(friendRequest: IFriendRequest) {
    const addedFriendRequest = new FriendRequestSchema({
      ...friendRequest,
    });
    await addedFriendRequest.save();
    return "Friend request was added successfully!";
  }

  async getFriendRequests(toId: Types.ObjectId) {
    return await FriendRequestSchema.find({ toId: toId }).populate("fromId");
  }
}

export default new FriendRequestService();
