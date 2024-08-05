import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      requried: [true, "có serviceName mới biết sửa cái gì chứ hả"],
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
    done: {
      type: Boolean,
    },
    cancel: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Orders", OrderSchema);

export default OrderModel;
