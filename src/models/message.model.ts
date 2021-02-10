import { model, Schema, Document } from "mongoose";
import { IMessage } from "./types";

const messageSchema: Schema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

interface IMessageDoc extends IMessage, Document {}

const Message = model<IMessageDoc>("Message", messageSchema);

export default Message;
