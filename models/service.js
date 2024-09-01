import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide service name"],
    unique: true,
    minLength: [5, "Tên dịch vụ cần phải dài hơn 5 ký tự"],
    maxLength: [25, "Tên dịch vụ cần phải ngắn hơn 25 ký tự"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "please provide service number"],
  },
  description: {
    type: String,
    required: [true, "Không mô tả ai hiểu gì mà đặt hả mày?"],
    minLength: [10, "Mô tả cần phải dài hơn 10 ký tự"],
    maxLength: [100, "Mô tả phải ngắn hơn 100 ký tự"],
    trim: true,
  },
  image: {
    type: Buffer,
    required: [true, "có hình cho đẹp bạn êy.."],
  },
  promotion: {
    type: Boolean,
  },
  promotionPrice: {
    type: Number,
  },
  color: {
    type: String,
    required: [true, "chọn cho dễ phân biệt"],
  },
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
