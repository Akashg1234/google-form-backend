import { mediaCloud } from "../index.js";
import multer from "multer";
import path from "path";


// Set up Multer storage and configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Set the filename
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf|doc|docx|jpg|jpeg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only certain file types are allowed'));
  }
};


export const upload = multer({ storage: storage, fileFilter: fileFilter });


export const fileUploadToCloudinary = async (localFilePath) => {
  const myCloud = await mediaCloud.uploader.upload(localFilePath, {
    resource_type: "auto",
  });
  return myCloud;
};


export const fileDeleteFromCloudinary = async (assetPublicId) => {
  await mediaCloud.uploader.destroy(assetPublicId, { resource_type: "auto" });
};
