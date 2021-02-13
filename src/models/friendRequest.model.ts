import { model, Schema, Document } from "mongoose";
import { IFriendRequest } from "./types";

const friendRequestSchema: Schema = new Schema({
  fromId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  toId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

friendRequestSchema.index({ fromId: 1, toId: 1 }, { unique: true });

export interface IFriendRequestDoc extends IFriendRequest, Document {}

const FriendRequest = model<IFriendRequestDoc>(
  "FriendRequest",
  friendRequestSchema
);

export default FriendRequest;
