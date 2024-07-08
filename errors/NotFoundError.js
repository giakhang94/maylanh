import CustomError from "./CustomError.js";

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export default NotFoundError;
