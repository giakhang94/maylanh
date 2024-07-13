import { NotFoundError } from "../errors/index.js";
import Service from "../models/service.js";
import { adminPermision } from "../utils/adminPermison.js";
import {
  validateRequired,
  validateRequiredService,
} from "../utils/Validator.js";

const createService = async (req, res, next) => {
  const { name, description, price, promotion, promotionPrice } = JSON.parse(
    req.body.input
  );
  const file = req.file.buffer;
  const service = await Service.create({
    name,
    description,
    price,
    promotion,
    promotionPrice,
    image: file,
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
  const { name, price, description, promotion, promotionPrice } = req.body;
  const serviceId = req.params.id;
  adminPermision(req.user.role);
  validateRequiredService(name, price, description);

  const updateObj = {};
  if (name) updateObj.name = name;
  if (price) updateObj.price = price;
  if (description) updateObj.description = description;
  if (promotion) updateObj.promotion = promotion;
  if (promotionPrice) updateObj.promotionPrice = promotionPrice;

  const updatedService = await Service.findByIdAndUpdate(serviceId, updateObj, {
    new: true,
  });
  if (!updatedService) {
    throw new NotFoundError("item not found");
  }
  res.status(201).json({ message: "update thành công!", updatedService });
};

export { createService, updateService, getAllService, getThumb };
