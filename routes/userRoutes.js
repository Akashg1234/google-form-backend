import { Router } from "express";
import { handleUserLogOut, handleUserLogin, handleUserRegister } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.post('/register',handleUserRegister)
userRouter.post('/login',handleUserLogin)
userRouter.get('/logout',isAuthenticated,handleUserLogOut)

export {userRouter}