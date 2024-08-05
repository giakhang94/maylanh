import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByClient,
} from "../controllers/orderController.js";
import clientAuth from "../middleware/clientAuth.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", auth, getAllOrders);
router.get("/order-by-client", clientAuth, getOrdersByClient);

export default router;
