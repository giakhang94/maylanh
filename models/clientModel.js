import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ClientSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "cần phải nhập sdt"],
    length: 9,
  },
  passowrd: {
    type: String,
    required: [true, "Không có pass bị phá ai chịu nổi"],
    minLength: 4,
  },
});

ClientSchema.pre("save", async function () {
  this.passowrd = await bcrypt.hash(this.passowrd, 8);
});
ClientModel.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.passowrd);

  return isMatch;
};

const ClientModel = mongoose.model("Client", ClientSchema);
export default ClientModel;
