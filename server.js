import "express-async-errors";
import cors from "cors";
import express from "express";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import userRouter from "./routers/user.js";
import serviceRouter from "./routers/service.js";
import orderRouter from "./routers/orderRouter.js";
import clientRouter from "./routers/clientRouter.js";
import ErrorHandlerMiddleware from "./middleware/ErrorHandlerMiddleWare.js";
import cookieParser from "cookie-parser";
//public
// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const corsConfig = {
  // Configures the Access-Control-Allow-Origin
  // origin: "http://localhost:3000",

  // Configures the Access-Control-Allow-Methods
  methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",

  //Configures the Access-Control-Allow-Headers
  allowedHeaders:
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization",

  // Configures the Access-Control-Allow-Credentials
  credentials: true,

  //Configures the Access-Control-Expose-Headers
  exposedHeaders: "Content-Range,X-Content-Range,Authorization",

  // Provides a status code to use for successful OPTIONS requests
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
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

//deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use("/auth", userRouter);
app.use("/service", serviceRouter);
app.use("/order", orderRouter);
app.use("/client", clientRouter);
app.use(ErrorHandlerMiddleware);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.send("Rounter này không tồn tại bạn ơi. From Huy with Love");
});
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
