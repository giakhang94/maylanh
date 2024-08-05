import { UnAuthorizationError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const clientAuth = async (req, res, next) => {
  const clientToken = req.cookies.clientToken;
  if (!clientToken) {
    throw new UnAuthorizationError("client haven't logged in yet");
  }
  try {
    const client = jwt.verify(clientToken, process.env.JWT_SECRET);

    req.client = client;
    next();
  } catch (error) {
    throw new UnAuthorizationError("Hãy đăng nhập để tiếp tục");
  }
};

export default clientAuth;
