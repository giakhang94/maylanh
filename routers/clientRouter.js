import express from "express";
import { clientLogin } from "../controllers/clientController.js";
const router = express.Router();

router.post("/login", clientLogin);

export default router;
