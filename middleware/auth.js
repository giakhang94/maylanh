import { UnAuthorizationError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthorizationError("Please login to continue");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthorizationError("Unauthenticated, login to continue");
  }
};
export default auth;
