import express from "express";
import { createService } from "../controllers/service.js";
import auth from "../middleware/auth.js";
import fileUpload from "../middleware/uploadImg.js";
const router = new express.Router();

router.post("/add", auth, fileUpload.single("thumb"), createService);

export default router;
