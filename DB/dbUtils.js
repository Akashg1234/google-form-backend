import { Schema, model ,connect} from "mongoose";
import handleAsync from "async-error-handler";
import chalk from "chalk";

const dataBaseConnection=handleAsync(async()=>{
    
        await connect(process.env.MONGO_URL)
        console.log("DB connected")

},function(err){chalk.redBright(err)})

export {Schema,model,dataBaseConnection}