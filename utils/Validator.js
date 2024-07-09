import validator from "validator";
import { BadRequestError } from "../errors/index.js";

const validateEmail = (email) => {
  const isValid = validator.isEmail(email);
  if (!isValid) {
    throw new BadRequestError("Please provide a valid emaill");
  }
};

const validateRequired = (email, password) => {
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }
};

export { validateEmail, validateRequired };
