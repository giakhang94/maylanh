import multer from "multer";

import { BadRequestError } from "../errors/index.js";
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limit: 5000000,
  // storage: multer.diskStorage({
  //   // destination: (req, file, cb) => {
  //   //   cb(null, "uploads/images");
  //   // },
  //   filename: (req, file, cb) => {
  //     const ext = MIME_TYPE_MAP[file.mimetype];
  //     cb(null, uuid() + "." + ext);
  //   },
  // }),
  fileFilter: (req, file, cb) => {
    console.log("tao");
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return new BadRequestError("Chỉ upload hình ảnh");
    }
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("invalid mime type");
    cb(error, isValid);
  },
});

export default fileUpload;
