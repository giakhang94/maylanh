import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const ClientSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "cần phải nhập sdt"],
      length: 10,
      unique: [true, "SĐT đã được đăng ký"],
    },
    password: {
      type: String,
      required: [true, "Không có pass bị phá ai chịu nổi"],
      minLength: [4, "password cần dài hơn 4 ký tự"],
    },
  },
  { timestamps: true }
);

ClientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  } else {
    return;
  }
});
ClientSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.password);
  return isMatch;
};

ClientSchema.methods.createJWT = async function () {
  const token = jwt.sign({ clientPhone: this.phone }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const ClientModel = mongoose.model("Client", ClientSchema);
export default ClientModel;
