import express from "express";
import {
  login,
  Register,
  logout,
  getCurretnUser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", auth, Register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-current-user", auth, getCurretnUser);

export default router;
