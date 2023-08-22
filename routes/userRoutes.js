import { Router } from "express";
import { handleUserLogOut, handleUserLogin, handleUserRegister } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register',handleUserRegister)
userRouter.post('/login',handleUserLogin)
userRouter.get('/logout',handleUserLogOut)

export {userRouter}