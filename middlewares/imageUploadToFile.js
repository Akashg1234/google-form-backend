import multer, { memoryStorage } from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import DataUriParser from "datauri/parser.js";


export const cloudinaryConfig=(req,res,next)=>{
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log("config in use.....");
  next()
}

// Set up Multer storage and configuration
const storage = memoryStorage({})


/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/

export const dataUri = (req) =>{
  const parser= new DataUriParser()
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
}


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf|doc|docx|jpg|jpeg|png/;
  // console.log(file);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only certain file types are allowed'));
  }
};


export const upload = multer({ storage: storage});


export const fileUploadToCloudinary = async (file) => {
  // console.log("fileUploadToCloudinary",file);
  const myCloud = await cloudinary.uploader.upload(file);
  console.log(myCloud);
  return myCloud;
};


export const fileDeleteFromCloudinary = async (assetPublicId) => {
  await uploader.destroy(assetPublicId, { resource_type: "auto" });
};
