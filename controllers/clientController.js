import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import UnAuthorizationError from "../errors/UnAuthorizationError.js";
import Client from "../models/clientModel.js";
import attachCookie from "../utils/attachCookie.js";
import { validatePhoneNumber } from "../utils/Validator.js";

const clientLogin = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    throw new BadRequestError("Hãy điền đầy đủ thông tin");
  }
  validatePhoneNumber(phone);
  const client = await Client.findOne({ phone });

  if (!client) {
    throw new NotFoundError("Không tìm thấy tài khoản");
  }
  const isMatch = await client.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Mật khẩu hoặc SĐT không đúng");
  }
  const token = await client.createJWT();
  attachCookie(res, "clientToken", token);
  res.status(201).json({ message: "Đăng nhập thành công" });
};

const getCurrentClient = async (req, res) => {
  const client = req.client;
  const currentClient = await Client.findById({ _id: client.id });
  if (!currentClient) {
    throw new UnAuthorizationError("not found account");
  }
  currentClient.password = undefined;
  res.status(200).json({ currentClient });
};

const logoutClient = async (req, res) => {
  attachCookie(res, "clientToken", "");
  res.status(200).json({ message: "Đã đăng xuất" });
};
export { clientLogin, getCurrentClient, logoutClient };
