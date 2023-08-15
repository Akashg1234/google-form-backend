import { Router } from "express";
import { handleUserLogOut, handleUserLogin, handleUserRegister } from "../controllers/userController";

const userRouter = Router();

userRouter.post('/register',handleUserRegister)
userRouter.post('/login',handleUserLogin)
userRouter.get('/logout',handleUserLogOut)

export {userRouter}