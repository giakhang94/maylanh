import express from "express";
import {
  countUnReadOrders,
  createOrder,
  getAllOrders,
  getOrdersByClient,
  setFlagOrder,
} from "../controllers/orderController.js";
import clientAuth from "../middleware/clientAuth.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", auth, getAllOrders);
router.get("/order-by-client", clientAuth, getOrdersByClient);
router.get("/unread", countUnReadOrders);
router.patch("/set-flag/:id", auth, setFlagOrder);

export default router;
