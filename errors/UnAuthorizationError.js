import CustomError from "./CustomError.js";

class UnAuthorizationError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
export default UnAuthorizationError;
