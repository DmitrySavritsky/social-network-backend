import express from "express";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

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
app.use("/", () => "hello");
app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`)
);
