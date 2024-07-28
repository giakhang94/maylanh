import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import {
  validateClientPassword,
  validatePhoneNumber,
} from "../utils/Validator.js";
import BadRequestError from "../errors/BadRequestError.js";
import ClientModel from "../models/clientModel.js";

const createOrder = async (req, res) => {
  const { phone, name, address, isRegister, password, note, serviceId } =
    req.body;
  validatePhoneNumber(phone);
  let newAccount = null;
  let order = null;
  //transaction session
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    if (isRegister) {
      validateClientPassword(password);
      // newAccount = await createClientAccount(phone, name, sess); cái này gọi ngang hàng k được (lưu cho nhớ)
      newAccount = new ClientModel({
        phone,
        password,
      });
      await newAccount.save({ session: sess });
    }
    // await newAccount.save();
    const createdBy = newAccount && newAccount._id ? newAccount._id : undefined;
    order = new Order({
      serviceId,
      createdBy,
      name,
      phone,
      address,
      note,
    });
    await order.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Xin hãy thử lại");
  }

  res.status(201).json({
    message: `${isRegister ? "Tạo tài khoản và" : ""} Đặt hẹn thàh công`,
    order,
  });
};

export { createOrder };
