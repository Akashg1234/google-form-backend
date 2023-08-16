import { mediaCloud } from "../index.js";

export const fileUploadToCloudinary = async (localFilePath) => {
  const myCloud = await mediaCloud.uploader.upload(localFilePath, {
    resource_type: "auto",
  });
  return myCloud;
};


export const fileDeleteFromCloudinary = async (assetPublicId) => {
  await mediaCloud.uploader.destroy(assetPublicId, { resource_type: "auto" });
};
