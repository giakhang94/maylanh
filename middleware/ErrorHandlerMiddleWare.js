const ErrorHandlerMiddleware = (error, req, res, next) => {
  // console.log("tao nef may ", error.name);
  const defaultError = {
    statusCode: error.statusCode || 500,
    message: error.message || "something went wrong",
  };
  //validate thì lần này dùng riêng bên controller rồi.
  //missed field cũng dùng bên controller
  //lỗi trùng email (unique email)
  if (error.code && error.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = "email has been already used";
  }
  res.status(defaultError.statusCode).json({
    statusCode: defaultError.statusCode,
    message: defaultError.message,
  });
};

export default ErrorHandlerMiddleware;
