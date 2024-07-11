import { UnAuthorizationError } from "../errors/index.js";

const adminPermision = (requestRole) => {
  if (requestRole !== "admin") {
    throw new UnAuthorizationError("Chỉ admin được thực hiện cái này");
  }
};

export { adminPermision };
