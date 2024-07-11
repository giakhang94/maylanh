import { NotFoundError } from "../errors";
import Service from "../models/service";
import { adminPermision } from "../utils/adminPermison";
import { validateRequired, validateRequiredService } from "../utils/Validator";

const createService = async (req, res, next) => {
  const data = req.body;
  const requestRole = req.user.role;
  adminPermision(requestRole);
  validateRequired(data.name, data.price);
  const service = await Service.create(data);
  await service.save();
  res.status(200).json({ message: "Đã tạo xong", service });
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

export { createService, updateService };
