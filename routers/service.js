import express from "express";
import {
  createService,
  getAllService,
  getThumb,
  updateService,
} from "../controllers/service.js";
import auth from "../middleware/auth.js";
import fileUpload from "../middleware/uploadImg.js";
const router = new express.Router();

router.post("/add", auth, fileUpload.single("thumb"), createService);
router.get("/", auth, getAllService);
router.get("/image/:id", auth, getThumb);
router.patch("/:id", auth, updateService);
router.delete("/:id", auth, updateService);

export default router;
