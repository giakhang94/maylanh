import validator from "validator";
import { BadRequestError } from "../errors/index.js";

const validateEmail = (email) => {
  const isValid = validator.isEmail(email);
  if (!isValid) {
    throw new BadRequestError("Please provide a valid emaill");
  }
};

const validateRequired = (email, password, role) => {
  if (!email || !password || !role) {
    throw new BadRequestError("Email and password are required");
  }
};
const validateRequiredService = (name, price, description) => {
  if (!name || !price || !description) {
    throw new BadRequestError("Missing field(s)");
  }
};
const validatePhoneNumber = (phone) => {
  const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

  if (!phone) {
    throw new BadRequestError("Bạn quên nhập SDT kìa");
  }
  if (!phone.match(regex)) {
    throw new BadRequestError("SDT không đúng định dạng");
  }
};
const validateClientPassword = (password) => {
  if (!password) {
    throw new BadRequestError("Xin vui lòng nhập password");
  }
};
export {
  validateEmail,
  validateRequired,
  validateRequiredService,
  validatePhoneNumber,
  validateClientPassword,
};
