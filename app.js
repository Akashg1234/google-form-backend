import express from 'express';
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { ErrorHandler, ErrorLogger } from './utils/errorHandler.js';
import cors from 'cors'
import { formRoute } from './routes/formRoutes.js';

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

app.use('/user',userRouter)
app.use('/form',formRoute)

app.use([ErrorLogger,ErrorHandler])

export default app;