import { Router } from "express";
import {
  isAuthenticated,
  isResponcer,
  isEditor,
} from "../middlewares/authentication";
const formRoute = Router();

formRoute.get('/all-forms',isAuthenticated,isEditor)
formRoute.post('/create-form',isAuthenticated,isEditor)
formRoute.put('/update-form',isAuthenticated,isEditor)
formRoute.delete('/delete-form/:formId',isAuthenticated,isEditor)
formRoute.get('/get-form/:formId',isAuthenticated,isResponcer)
formRoute.get('/edit-form/:formId',isAuthenticated,isEditor)

export { formRoute };