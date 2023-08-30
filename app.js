import express from 'express';
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { ErrorHandler, ErrorLogger } from './utils/errorHandler.js';
import cors from 'cors'
import { formRoute } from './routes/formRoutes.js';
import { cloudinaryConfig } from './middlewares/imageUploadToFile.js';
import { questionRoute } from './routes/questionRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
    
  })
);
app.use("/*", cloudinaryConfig);
app.use('/user',userRouter)
app.use('/form',formRoute)
app.use('/question',questionRoute)

app.use([ErrorLogger,ErrorHandler])

export default app;