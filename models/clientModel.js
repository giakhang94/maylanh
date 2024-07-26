import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ClientSchema = new mongoose.Schema({
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
});

ClientSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
});
ClientSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.passowrd);

  return isMatch;
};

const ClientModel = mongoose.model("Client", ClientSchema);
export default ClientModel;
