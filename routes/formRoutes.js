import { Router } from "express";
import {
  isAuthenticated,
  isResponcer,
  isEditor,
} from "../middlewares/authentication.js";
import { upload } from "../middlewares/imageUploadToFile.js";
import {
  updateFormHeaderFont,addFormHeaderImage,
  getAllFormOfTheOwner,
  getTheForm,
  handleUserFormCreation,
  updateFormHeaderFontSize,
  updateFormTitle,
  updateFormFont,
  updateFormFontSize,
  updateQuestionFont,
  updateQuestionFontSize,
  deleteTheForm,
  shareFormViaEmails,
} from "../controllers/formController.js";
const formRoute = Router();

formRoute.get('/all-forms',isAuthenticated,getAllFormOfTheOwner)
formRoute.post('/create-form',isAuthenticated,handleUserFormCreation)
formRoute.put('/update-form',isAuthenticated,isEditor)
formRoute.delete('/delete-form/:formId',isAuthenticated,isEditor,deleteTheForm)
formRoute.get('/get-form/:formId',isAuthenticated,isResponcer,getTheForm)
formRoute.put('/edit-form/title/:formId',isAuthenticated,isEditor,updateFormTitle)
formRoute.put(
  "/edit-form/form-header-font/:formId",
  isAuthenticated,
  isEditor,
  updateFormHeaderFont
);

formRoute.put(
  "/edit-form/form-header-font-size/:formId",
  isAuthenticated,
  isEditor,
  updateFormHeaderFontSize
);

formRoute.put(
  "/edit-form/form-font/:formId",
  isAuthenticated,
  isEditor,
  updateFormFont
);

formRoute.put(
  "/edit-form/form-font-size/:formId",
  isAuthenticated,
  isEditor,
  updateFormFontSize
);

formRoute.put(
  "/edit-form/form-question-font/:formId",
  isAuthenticated,
  isEditor,
  updateQuestionFont
);

formRoute.put(
  "/edit-form/form-question-font-size/:formId",
  isAuthenticated,
  isEditor,
  updateQuestionFontSize
);

formRoute.post(
  "/edit-form/send-form-via-email/:formId",
  isAuthenticated,
  isEditor,
  shareFormViaEmails
);

formRoute.get(
  "/add-image-header/:formId",
  upload.single("headerImage"),
  isAuthenticated,
  isEditor,
  addFormHeaderImage
);

export { formRoute };