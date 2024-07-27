import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import {
  validateClientPassword,
  validatePhoneNumber,
} from "../utils/Validator.js";
import createClientAccount from "./clientController.js";
import BadRequestError from "../errors/BadRequestError.js";
import ClientModel from "../models/clientModel.js";

const createOrder = async (req, res) => {
  const { phone, name, address, isRegister, password, note, serviceId } =
    req.body;
  validatePhoneNumber(phone);
  let newAccount = null;
  let order = null;
  //transaction session
  const sess = await mongoose.startSession();
  await sess.withTransaction(async () => {
    try {
      if (isRegister) {
        validateClientPassword(password);
        // newAccount = await createClientAccount(phone, name, sess); cái này gọi ngang hàng k được (lưu cho nhớ)
        newAccount = await ClientModel.create(
          { phone, password },
          { session: sess }
        );
      }
      await newAccount.save();
      const createdBy =
        newAccount && newAccount._id ? newAccount._id : undefined;
      order = await Order.create(
        {
          createdBy,
          phone,
          name,
          address,
          note,
          // serviceId,
        },
        { session: sess }
      );
      await order.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Xin hãy thử lại");
    }
  });
  sess.endSession();

  res.status(201).json({
    message: `${isRegister ? "Tạo tài khoản và" : ""} Đặt hẹn thàh công`,
    order,
  });
};

export { createOrder };
