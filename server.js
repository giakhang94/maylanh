import "express-async-errors";
import cors from "cors";
import express from "express";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import userRouter from "./routers/user.js";
import serviceRouter from "./routers/service.js";
import ErrorHandlerMiddleware from "./middleware/ErrorHandlerMiddleWare.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//add header to handle cors-issue
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });
//using router
app.use("/auth", userRouter);
app.use("/service", serviceRouter);
app.use(ErrorHandlerMiddleware);
const PORT = process.env.PORT || 5000;
const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is on port ${PORT}`);
    });
  } catch (error) {
    console.log("Can not connect to Database");
    // console.log(error);
  }
};
start();
