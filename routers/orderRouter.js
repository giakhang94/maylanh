import express from "express";
import {
  clientCancel,
  countUnReadOrders,
  createOrder,
  getAllOrders,
  getOrdersByClient,
  getOrderStats,
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
router.patch("/client-cancel/:id", clientAuth, clientCancel);
router.get("/stats", auth, getOrderStats);

export default router;
