import { Router } from "express";
import {
  isAuthenticated,
  isResponcer,
  isEditor,
} from "../middlewares/authentication.js";
import { getAllResponse, getResponse, getResponseOfAUser, getResponseOfId, submitResponse } from "../controllers/responseController.js";

export const responseRoute = Router();

const middlewares = [isAuthenticated,isResponcer]

// get all the response of the form
responseRoute.get('/get-all-response/:formId',middlewares,getAllResponse)
// get the response of the form
responseRoute.get('/get-response/:formId/question/:questionId',middlewares,getResponse)
// get the response of the user 
responseRoute.get('/get-response-of-the-user/:userId/form/:formId/question/:questionId',middlewares,getResponseOfAUser)
// get the perticular response of the form
responseRoute.get(
  "/get-the-response/form/:formId/response/:responceId",middlewares,
  getResponseOfId
);
// submit the response of the form
responseRoute.post(
  "/response/form/:formId/question/:questionId",middlewares,
  submitResponse
);