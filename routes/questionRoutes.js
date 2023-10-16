import { Router } from "express";
import {
  isAuthenticated,
  isResponcer,
  isEditor,
} from "../middlewares/authentication.js";
import {
  addCorrectAnswer,
  addImageCaptionToQuestion,
  addImageToQuestion,
  addMultipleAnswer,
  createQuestion,
  deleteImageCaptionToQuestion,
  deleteQuestion,
  setAllowedSpecificFileType,
  setAnswerSuffelHandler,
  setFileSize,
  setNumberOfFiles,
  setQuestionIsRequired,
  setQuestionTitleStyleBoldHandler,
  setQuestionTitleStyleItalicHandler,
  setQuestionTitleStyleUnderlineHandler,
  setSpecificFileType,
  updateImageAllignmentToQuestion,
  updateQuestionTitle,
  updateTypesOfQuestion,
  updateVideoAllignmentToQuestion,
  deleteImageToQuestion,
  updateImageToQuestion,
  addVideoCaptionToQuestion,
  deleteVideoCaptionToQuestion,
  addVideoToQuestion,
  deleteVideoToQuestion,
} from "../controllers/questionController.js";
import { upload } from "../middlewares/imageUploadToFile.js";


// giveResponse
export const questionRoute = Router();

questionRoute.post('/create-question/:formId',isAuthenticated,isEditor,createQuestion)
questionRoute.delete(
  "/delete-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  deleteQuestion
);

questionRoute.put(
  "/update-question-title/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  updateQuestionTitle
);

questionRoute.put(
  "/update-question-type/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  updateTypesOfQuestion
);

questionRoute.put(
  "/add-question-answer/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addMultipleAnswer
);

questionRoute.post(
  "/add-image-question-caption/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addImageCaptionToQuestion
);

questionRoute.delete(
  "/delete-image-question-caption/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  deleteImageCaptionToQuestion
);


questionRoute.put(
  "/update-image-allignment-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  updateImageAllignmentToQuestion
);

questionRoute.put(
  "/update-video-allignment-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  updateVideoAllignmentToQuestion
);

questionRoute.put(
  "/set-answer-suffel-option/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setAnswerSuffelHandler
);

questionRoute.put(
  "/add-correct-answer-option/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addCorrectAnswer
);


questionRoute.put(
  "/set-answer-mandate/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setQuestionIsRequired
);

questionRoute.put(
  "/set-question-title-style-bold/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setQuestionTitleStyleBoldHandler
);

questionRoute.put(
  "/set-question-title-style-italic/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setQuestionTitleStyleItalicHandler
);


questionRoute.put(
  "/set-question-title-style-underline/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setQuestionTitleStyleUnderlineHandler
);


questionRoute.put(
  "/set-required-specific-file-type/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setAllowedSpecificFileType
);


questionRoute.post(
  "/set-specific-file-type/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setSpecificFileType
);

questionRoute.post(
  "/set-file-size/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setFileSize
);


questionRoute.post(
  "/set-number-of-files/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  setNumberOfFiles
);
// add image to question
questionRoute.post(
  "/add-image-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  upload.single("questionImage"),
  addImageToQuestion
);

// delete image to question
questionRoute.delete(
  "/delete-image-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  deleteImageToQuestion
);
// update image to question
questionRoute.delete(
  "/update-image-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  upload.single("questionImage"),
  updateImageToQuestion
);
// add video caption to the question
questionRoute.post(
  "/add-video-caption-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addVideoCaptionToQuestion
);
// delete video caption to the question
questionRoute.delete(
  "/delete-video-caption-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  deleteVideoCaptionToQuestion
);
// add video to the question
questionRoute.post(
  "/add-video-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addVideoToQuestion
);
// delete video to the question
questionRoute.post(
  "/delete-video-to-question/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  deleteVideoToQuestion
);