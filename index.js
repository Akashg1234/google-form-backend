import { config } from "dotenv";

config({
  path: "./config/config.env",
});

import app from "./app.js";
import { dataBaseConnection } from "./DB/dbUtils.js";
import chalk from "chalk";



dataBaseConnection().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(
      chalk.bold(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
      )
    );
  });
}).catch((err)=>{
  console.log(chalk.bold(chalk.redBright(` ERROR :: ${err.message}`)));
  process.exit(1)
})
