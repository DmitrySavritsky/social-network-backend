import express from "express";
import userRouter from "./src/routers/userRouter";
import authRouter from "./src/routers/authRouter";
import postRouter from "./src/routers/postRouter";
import friendRequestRouter from "./src/routers/friendRequestRouter";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import commentRouter from "./src/routers/commentRouter";

const app = express();
const PORT = 4000;
const connectionString = "mongodb://localhost:27017/social_network";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/friendRequests", friendRequestRouter);
app.use("/api/comments",commentRouter);
app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`)
);
