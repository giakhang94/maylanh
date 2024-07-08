import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  } else return;
});

UserSchema.methods.comparePassword = async function (clientPass) {
  const isMatched = await bcrypt.compare(clientPass, this.password);
  return isMatched;
};

UserSchema.methods.createJWT = function () {
  // console.log(this._id);
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const User = mongoose.model("User", UserSchema);
export default User;
