import { model, Schema, Document } from "mongoose";
import { IChat } from "./types";

const chatSchema: Schema = new Schema({
  chatName: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

interface IChatDoc extends IChat, Document {}

const Chat = model<IChatDoc>("Chat", chatSchema);

export default Chat;
