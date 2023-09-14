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
  updateFormHeaderImage,
  createLink,
  setQuestionSuffelHandler,
  setFormHeaderFontBoldStyleHandler,
  setFormHeaderFontItalicStyleHandler,
  setFormHeaderFontUnderlineStyleHandler,
  deleteteFormHeaderImage,
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
  "/edit-form/create-form-link/:formId",
  isAuthenticated,
  isEditor,
  createLink
);

formRoute.put(
  "/set-form-question-suffel/:formId",
  isAuthenticated,
  isEditor,
  setQuestionSuffelHandler
);
formRoute.put(
  "/set-header-font-bold/:formId",
  isAuthenticated,
  isEditor,
  setFormHeaderFontBoldStyleHandler
);
formRoute.put(
  "/set-header-font-italic/:formId",
  isAuthenticated,
  isEditor,
  setFormHeaderFontItalicStyleHandler
);
formRoute.put(
  "/set-header-font-underline/:formId",
  isAuthenticated,
  isEditor,
  setFormHeaderFontUnderlineStyleHandler
);
// add the header image
formRoute.post(
  "/add-image-header/:formId",
  isAuthenticated,
  isEditor,
  upload.single("headerImage"),
  addFormHeaderImage
);
// update the header image
formRoute.put(
  "/update-image-header/:formId",
  isAuthenticated,
  isEditor,
  upload.single("headerImage"),
  updateFormHeaderImage
);

// delete the header image
formRoute.delete(
  "/delete-image-header/:formId",
  isAuthenticated,
  isEditor,
  deleteteFormHeaderImage
);

export { formRoute };