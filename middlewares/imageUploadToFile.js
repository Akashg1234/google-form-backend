import multer, { diskStorage } from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const cloudinaryConfig=(req,res,next)=>{
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log("cloudinary config in use.....");
  next()
}

// Set up Multer storage and configuration
const storage = diskStorage({
  destination:function(req,file,cb){
    // console.log('destination');
    // cb for (error,destination)
    return cb(null,'./upload')
  
  },
  filename:function(req,file,cb){
    // console.log('filename');
    const newFileName = Date.now()+req.user._id+file.originalname
    // cb for (error,filename)
    return cb(null,newFileName)
  }
})


/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/

// export const dataUri = (req) =>{
//   const parser= new DataUriParser()
//   return parser.format(
//     path.extname(req.file.originalname).toString(),
//     req.file.buffer
//   );
// }


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf|doc|docx|jpg|jpeg|png/;
  // console.log("filter file",file);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    // console.log("file sended");
    return cb(null, true);
  } else {
    // error 
    return cb(new Error('Only certain file types are allowed'),false);
  }
};

// multer upload instance
export const upload = multer({ storage: storage,fileFilter:fileFilter});

// upload the file to cloudinary
export const fileUploadToCloudinary = async (filePath) => {
  // console.log("fileUploadToCloudinary:", filePath);
  const myCloud = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
  });
  
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
  }
  
  return myCloud;
  
};

// delete the file from cloudinary
export const fileDeleteFromCloudinary = async (assetPublicId) => {
  await cloudinary.uploader.destroy(assetPublicId, { resource_type: "image" });
};
// upload the video file to cloudinary
export const videoFileUploadToCloudinary = async (filePath) => {
  // console.log("fileUploadToCloudinary:", filePath);
  const myCloud = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
  });
  
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
  }
  
  return myCloud;
  
};

// delete the video file from cloudinary
export const videoFileDeleteFromCloudinary = async (assetPublicId) => {
  await cloudinary.uploader.destroy(assetPublicId, { resource_type: "video" });
};
// raw file upload to cloudinary
export const rawFileUploadToCloudinary = async (filePath) => {
  // console.log("fileUploadToCloudinary:", filePath);
  const myCloud = await cloudinary.uploader.upload(filePath, {
    resource_type: "raw",
  });
// delete the file from the server
  
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
  }

  return myCloud;
};

// raw file delete from cloudinary
export const rawFileDeleteFromCloudinary = async (assetPublicId) => {
  await cloudinary.uploader.destroy(assetPublicId, { resource_type: "raw" });
};
