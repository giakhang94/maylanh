import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
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

const OrderModel = mongoose.model("Orders", OrderSchema);

export default OrderModel;
