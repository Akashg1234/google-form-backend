import { Schema, model ,connect} from "mongoose";
import handleAsync from "async-error-handler";
import chalk from "chalk";

const dataBaseConnection = handleAsync(
  async () => {
    await connect(process.env.MONGO_URI);
    console.log(chalk.bold(chalk.yellowBright("DB connected")));
  },
  (err) => {
    console.log(chalk.bold(chalk.redBright(err.message)));
    process.exit(1);
  }
);

export {Schema,model,dataBaseConnection}