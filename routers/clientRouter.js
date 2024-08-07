import express from "express";
import {
  clientLogin,
  getCurrentClient,
  logoutClient,
} from "../controllers/clientController.js";
import clientAuth from "../middleware/clientAuth.js";
const router = express.Router();

router.post("/login", clientLogin);
router.get("/logout", logoutClient);
router.get("/get-current", clientAuth, getCurrentClient);

export default router;
