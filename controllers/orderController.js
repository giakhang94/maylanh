import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import {
  validateClientPassword,
  validatePhoneNumber,
} from "../utils/Validator.js";
import BadRequestError from "../errors/BadRequestError.js";
import ClientModel from "../models/clientModel.js";
import UnAuthorizationError from "../errors/UnAuthorizationError.js";
import { adminPermision } from "../utils/adminPermison.js";

const createOrder = async (req, res) => {
  const {
    phone,
    name,
    address,
    isRegister,
    password,
    note,
    serviceId,
    serviceName,
  } = req.body;
  validatePhoneNumber(phone);
  let newAccount = null;
  let order = null;
  let createdBy = null;
  //transaction session
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    if (isRegister) {
      validateClientPassword(password);
      // newAccount = await createClientAccount(phone, name, sess); cái này gọi ngang hàng k được (lưu cho nhớ)
      //check if this phone number has already registerd
      const existedClient = await ClientModel.findOne({ phone: phone });
      if (existedClient) {
        createdBy = existedClient._id;
      } else {
        newAccount = new ClientModel({
          phone,
          password,
        });
        await newAccount.save({ session: sess });
        createdBy = newAccount && newAccount._id ? newAccount._id : undefined;
      }
    } else {
      // newAccount = await createClientAccount(phone, name, sess); cái này gọi ngang hàng k được (lưu cho nhớ)
      //check if this phone number has already registerd
      const existedClient = await ClientModel.findOne({ phone: phone });
      if (existedClient) {
        createdBy = existedClient._id;
      } else {
        createdBy = undefined;
      }
    }
    // await newAccount.save();
    order = new Order({
      serviceId,
      createdBy,
      name,
      phone,
      address,
      note,
      serviceName,
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

const getAllOrders = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new UnAuthorizationError("Login first");
  }
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("createdBy")
    .exec();

  res.status(200).json({ orders });
};

const getOrdersByClient = async (req, res) => {
  const client = req.client;
  if (!client) throw new UnAuthorizationError("Đăng nhập để tiếp tục");
  const id = client.id;
  const orders = await Order.find({ createdBy: id })
    .sort({ createdAt: 1 })
    .populate("createdBy")
    .exec();
  console.log(orders);
  res.status(200).json({ orders });
};

const setFlagOrder = async (req, res) => {
  const { type } = req.body;
  const user = req.user;
  const orderId = req.params.id;
  adminPermision(user.role);
  if (!type) {
    throw new BadRequestError("hãy chọn cancel hay done");
  }
  const order = await Order.findById(orderId);
  console.log(type);
  if (type === "cancel") {
    if (order.cancel === false) {
      order.cancel = true;
    } else {
      if (order.cancel === true) order.cancel = false;
    }
  } else {
    if (order.done === false) {
      order.done = true;
    } else {
      if (order.done === true) order.done = false;
    }
  }

  await order.save();
  res.status(201).json({ message: "Cập nhật thành công" });
};

export { createOrder, getAllOrders, getOrdersByClient, setFlagOrder };
