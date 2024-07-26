import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import {
  validateClientPassword,
  validatePhoneNumber,
} from "../utils/Validator.js";
import createClientAccount from "./clientController.js";
import BadRequestError from "../errors/BadRequestError.js";

const createOrder = async (req, res) => {
  const { sdt, name, address, isRegister, password, note } = req.body;
  validatePhoneNumber(sdt);
  let newAccount = null;
  if (isRegister) {
    validateClientPassword(password);
    newAccount = await createClientAccount(sdt, password);
  }
  const createdBy = newAccount._id ? newAccount._id : undefined;
  const order = await Order.create({
    createdBy,
    phone: sdt,
    name,
    address,
    note,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    order.save({ session: sess });
    newAccount.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Xin hãy thử lại");
  }

  res.status(201).json({
    message: `${isRegister && "Tạo tài khoản và"} Đặt hẹn thàh công`,
    order,
  });
};

export { createOrder };
