import mongoose, { now } from "mongoose";
import Order from "../models/orderModel.js";
import {
  validateClientPassword,
  validatePhoneNumber,
} from "../utils/Validator.js";
import BadRequestError from "../errors/BadRequestError.js";
import ClientModel from "../models/clientModel.js";
import UnAuthorizationError from "../errors/UnAuthorizationError.js";
import { adminPermision } from "../utils/adminPermison.js";
import NotFoundError from "../errors/NotFoundError.js";

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
  const { services, from, to, search, renew } = req.query;
  console.log(renew);
  if (!user) {
    throw new UnAuthorizationError("Login first");
  }
  const queryObj = {};
  if (services) {
    queryObj.serviceName = services;
  }
  if (search) {
    queryObj.$or = [
      { name: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { note: { $regex: search, $options: "i" } },
    ];
  }

  if (!from && to) {
    queryObj.createdAt = { $lte: new Date(to) };
  }
  if (from && to) {
    queryObj.createdAt = { $gte: new Date(from), $lte: new Date(to) };
  }
  if (from && !to) {
    queryObj.createdAt = { $gte: new Date(from) };
  }
  // console.log(queryObj);
  const orders = await Order.find({ ...queryObj })
    .sort({ createdAt: -1 })
    .populate("createdBy")
    .exec();
  let filterRenew = null;
  if (renew > 0) {
    filterRenew = orders.filter((order) => {
      return (
        new Date().getMonth() - new Date(order.updatedAt).getMonth() == renew
      );
    });
  }
  let result = filterRenew ? filterRenew : orders;
  res.status(200).json({ orders: result });
};

const getOrdersByClient = async (req, res) => {
  const client = req.client;
  if (!client) throw new UnAuthorizationError("Đăng nhập để tiếp tục");
  const id = client.id;
  const orders = await Order.find({ createdBy: id })
    .sort({ createdAt: 1 })
    .populate("createdBy")
    .exec();
  // console.log(orders);
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
  // console.log(type);
  if (type === "cancel") {
    if (order.cancel === false) {
      order.cancel = true;
    } else {
      if (order.cancel === true) order.cancel = false;
    }
  } else if (type === "done") {
    if (order.done === false) {
      order.done = true;
    } else {
      if (order.done === true) order.done = false;
    }
  } else {
    if (type === "read") {
      order.isRead = true;
    }
    if (type === "unRead") {
      order.isRead = false;
    }
  }
  //client cancel

  await order.save();
  res.status(201).json({ message: "Cập nhật thành công" });
};
const clientCancel = async (req, res) => {
  const client = req.client;
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    throw new NotFoundError("Không tìm thấy đơn này");
  }
  if (order.createdBy.toString() !== client.id) {
    throw new UnAuthorizationError("Bạn không thể hủy đơn này");
  }
  order.clientCancel = true;

  await order.save();
  res.status(201).json({ message: "Đã hủy hẹn" });
};

const countUnReadOrders = async (req, res) => {
  const count = await Order.countDocuments({ isRead: false });
  res.status(200).json({ unread: count });
};

export {
  createOrder,
  getAllOrders,
  getOrdersByClient,
  setFlagOrder,
  countUnReadOrders,
  clientCancel,
};
