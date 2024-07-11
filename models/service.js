import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide service name"],
    unique: true,
    minLength: 5,
    maxLength: 25,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "please provide service number"],
  },
  description: {
    type: Number,
    required: [true, "Không mô tả ai hiểu gì mà đặt hả mày?"],
    minLength: 10,
    maxLength: 50,
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
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
