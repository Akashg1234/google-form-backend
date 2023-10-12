import express from 'express';
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { ErrorHandler, ErrorLogger } from './utils/errorHandler.js';
import cors from 'cors'
import { formRoute } from './routes/formRoutes.js';
import { cloudinaryConfig } from './middlewares/imageUploadToFile.js';
import { questionRoute } from './routes/questionRoutes.js';
import { responseRoute } from './routes/responseRoute.js';

const app = express();

console.log(process.env.SMTP_PASS);
const middlewares = [
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
];

app.use(middlewares);

app.use("/*", cloudinaryConfig);
app.use('/user',userRouter)
app.use('/form',formRoute)
app.use('/question',questionRoute)
app.use("/response", responseRoute);

app.use([ErrorLogger,ErrorHandler])

export default app;