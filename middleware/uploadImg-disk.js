import multer from "multer";
import uuid from "uuid";
import { BadRequestError } from "../errors/index.js";
const MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const fileUpload_disk = multer({
  limits: 50000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return new BadRequestError("Chỉ upload hình ảnh");
    }
    const isValid = !MINE_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("invalid mime type");
    cb(error, isValid);
  },
});
export default fileUpload_disk;
