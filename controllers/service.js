import { BadRequestError, NotFoundError } from "../errors/index.js";
import Service from "../models/service.js";
import { adminPermision } from "../utils/adminPermison.js";
import {
  validateRequired,
  validateRequiredService,
} from "../utils/Validator.js";

const createService = async (req, res, next) => {
  const { name, description, price, promotion, promotionPrice, color } =
    JSON.parse(req.body.input);
  const file = req.file.buffer;
  const service = await Service.create({
    name,
    description,
    price,
    promotion,
    promotionPrice,
    image: file,
    color,
  });
  res.status(200).json({ message: "Đã tạo dịch vụ xong", service });
};
const getAllService = async (req, res) => {
  const services = await Service.find();
  if (!services) {
    throw new NotFoundError("There no service to display");
  }
  res.status(200).json({ message: "get all services done", services });
};
const getThumb = async (req, res) => {
  const id = req.params.id;
  const service = await Service.findOne({ _id: id });
  res.set("content-type", "image/png, image/jpg, image/jpeg");
  res.send(service.image);
};

const updateService = async (req, res) => {
  const file = req.file ? req.file.buffer : null;
  let { name, price, description, promotion, promotionPrice } = req.body;

  const serviceId = req.params.id;
  adminPermision(req.user.role);

  const serviceToUpdate = await Service.findOne({ _id: serviceId });

  if (!serviceToUpdate) {
    throw new NotFoundError("item not found");
  }

  if (name) serviceToUpdate.name = name;
  if (price > 0) {
    serviceToUpdate.price = price;
  } else {
    price = serviceToUpdate.price;
    console.log(price);
  }
  if (description) serviceToUpdate.description = description;
  if (promotionPrice) serviceToUpdate.promotionPrice = promotionPrice;
  if (promotionPrice > 0) {
    serviceToUpdate.promotion = true;
  } else {
    serviceToUpdate.promotion = false;
  }
  if (promotionPrice >= price) {
    throw new BadRequestError("Đặt giá khuyến mãi ngu vcl");
  }
  if (file) {
    serviceToUpdate.image = file;
  }

  await serviceToUpdate.save();
  res.status(201).json({ message: "update thành công!", serviceToUpdate });
};

const deleteService = async (req, res) => {
  const serviceId = req.params.id;
  adminPermision(req.user.role);
  const result = await Service.findByIdAndDelete({ _id: serviceId });
  if (!result) {
    throw BadRequestError("Xóa lại cái nữa đi nè ố dè");
  }
  res.status(201).json({ message: "Đã xóa xong" });
};

export { createService, updateService, getAllService, getThumb, deleteService };
