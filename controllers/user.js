import validator from "validator";
import attachCookie from "../utils/attachCookie.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import User from "../models/user.js";
import { validateEmail, validateRequired } from "../utils/Validator.js";
import { adminPermision } from "../utils/adminPermison.js";

const Register = async (req, res) => {
  const { email, password, role } = req.body;
  const requsetRole = req.user.role;
  //validate
  adminPermision(requsetRole);
  validateRequired(email, password, role);
  validateEmail(email);
  const newUser = await User.create({ email, password, role });
  //   if (!newUser) {
  //     throw new BadRequestError("something went wrong, please try again");
  //   }
  await newUser.save();
  res.status(201).json({ message: "User Created", user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //validate
  validateRequired(email, password, 1);
  validateEmail(email);
  //login
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("user not found");
  }
  const isMatchPassword = await user.comparePassword(password);
  // console.log("ismatched", isMatchPassword);
  if (!isMatchPassword) {
    throw new BadRequestError("password or email not match");
  }
  const token = await user.createJWT();
  user.password = undefined;
  attachCookie(res, "token", token);
  res.status(200).json({ message: "Login Successfully", user });
};

const logout = (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ message: "user logged out" });
};

const getCurretnUser = async (req, res) => {
  const { user } = req;
  console.log(user.role);
  const currentUser = await User.findById(user.userId);
  if (!currentUser) {
    throw new NotFoundError("user not found, login to continue");
  }
  currentUser.password = undefined;
  res.status(200).json({ user: currentUser });
};

export { Register, login, logout, getCurretnUser };
