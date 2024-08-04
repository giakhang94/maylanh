import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
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

export { clientLogin };
