import express from "express";
import {
  clientLogin,
  getCurrentClient,
} from "../controllers/clientController.js";
import clientAuth from "../middleware/clientAuth.js";
const router = express.Router();

router.post("/login", clientLogin);
router.get("/get-current", clientAuth, getCurrentClient);

export default router;
