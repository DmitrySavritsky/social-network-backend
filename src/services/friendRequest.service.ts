import FriendRequestSchema from "../models/friendRequest.model";
import { Types } from "mongoose";
import { IFriendRequest } from "../models/types";
import userService from "./user.service";

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
    if (
      await this.containsFriendRequest(friendRequest.toId, friendRequest.fromId)
    ) {
      this.acceptFriendRequest(friendRequest.toId, friendRequest.fromId);
      return "Added friend!";
    }
    const addedFriendRequest = new FriendRequestSchema({
      ...friendRequest,
    });
    await addedFriendRequest.save();
    return "Friend request was added successfully!";
  }

  async getFriendRequests(toId: Types.ObjectId) {
    const friendRequests = await FriendRequestSchema.find({
      toId: toId,
    }).populate("fromId");

    const friendRequestsArray = friendRequests.map(async (element: any) => {
      return {
        _id: element.fromId._id,
        firstName: element.fromId.firstName,
        lastName: element.fromId.lastName,
        login: element.fromId.login,
      };
    });
    return Promise.all(friendRequestsArray);
  }

  async getFriendRequestsToId(toId: Types.ObjectId) {
    const friendRequests = await FriendRequestSchema.find({
      toId: toId,
    });
    return friendRequests;
  }

  async acceptFriendRequest(ownerId: Types.ObjectId, friendId: Types.ObjectId) {
    await FriendRequestSchema.findOneAndDelete({
      fromId: friendId,
      toId: ownerId,
    });
    await userService.addFriendById(ownerId, friendId);
    return "Friend request was accepted!";
  }

  async declineFriendRequest(
    ownerId: Types.ObjectId,
    friendId: Types.ObjectId
  ) {
    await FriendRequestSchema.findOneAndDelete({
      fromId: friendId,
      toId: ownerId,
    });
    return "Friend request was declined!";
  }
}

export default new FriendRequestService();
