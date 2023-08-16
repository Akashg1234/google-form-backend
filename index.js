import { config } from "dotenv";
import app from "./app.js";
import { dataBaseConnection } from "./DB/dbUtils.js";
import chalk from "chalk";
import { v2 as cloudinary } from "cloudinary";

config({
    path:'./config/config.env'
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const mediaCloud = cloudinary;

dataBaseConnection().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(
      chalk.bold(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
      )
    );
  });
}).catch((err)=>{
  console.log(chalk.bold(chalk.redBright(err.message)));
})
