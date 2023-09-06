import { Router } from "express";
import {
  isAuthenticated,
  isResponcer,
  isEditor,
} from "../middlewares/authentication.js";
import { addCorrectAnswer, addImageCaptionToQuestion, addMultipleAnswer, addParagraphAnswer, addShortAnswer, createQuestion, deleteImageCaptionToQuestion, deleteQuestion, setAllowedSpecificFileType, setAnswerSuffelHandler, setFileSize, setNumberOfFiles, setQuestionIsRequired, setQuestionTitleStyleBoldHandler, setQuestionTitleStyleItalicHandler, setQuestionTitleStyleUnderlineHandler, setSpecificFileType, updateImageAllignmentToQuestion, updateQuestionTitle, updateTypesOfQuestion, updateVideoAllignmentToQuestion } from "../controllers/questionController.js";

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
  "/give-short-ans/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addShortAnswer
);

questionRoute.put(
  "/give-paragraph-ans/:formId/question/:questionId",
  isAuthenticated,
  isEditor,
  addParagraphAnswer
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

