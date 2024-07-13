import { BadRequestError } from "../errors/index.js";

const ErrorHandlerMiddleware = (error, req, res, next) => {
  // console.log("tao nef may ", error.name);
  const defaultError = {
    statusCode: error.statusCode || 500,
    message: error.message || "something went wrong",
  };
  //validate thì lần này dùng riêng bên controller rồi.
  //missed field cũng dùng bên controller
  //lỗi trùng email (unique email)
  // console.log(error);

  if (error.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(error.errors)[0].message;
  }
  if (error.code && error.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = "Field's value has been already used";
  }
  res.status(defaultError.statusCode).json({
    statusCode: defaultError.statusCode,
    message: defaultError.message,
  });
};

export default ErrorHandlerMiddleware;
