import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, "xin mời nhập tên"],
  },
  phone: {
    type: String,
    required: [true, "Ôi bạn quên nhập SĐT"],
  },
  address: {
    type: String,
  },
  note: {
    type: String,
  },
});
