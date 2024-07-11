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
export { validateEmail, validateRequired, validateRequiredService };
