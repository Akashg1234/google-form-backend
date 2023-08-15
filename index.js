import { config } from "dotenv";
import app from "./app.js";
import { dataBaseConnection } from "./DB/dbUtils.js";
import chalk from "chalk";

config({
    path:'./config/config.env'
});

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
