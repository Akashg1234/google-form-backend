import jwt from "jsonwebtoken";
import { errorThrow } from "../utils/errorHandler.js";
import handleAsync from "async-error-handler";
import { userModel } from "../DB/userModel.js";
import { formModel } from "../DB/formModel.js";

export const isAuthenticated = handleAsync(
  async (req, res, next) => {
    // get the jwt token from the cookie
    // console.log(req);
    const {login_token} = req.cookies;

    if (
      !login_token
    ) {
      // throw the error to login the resource
      errorThrow(
        `Please log in to access this resource`,
        401,
        "Permission denied"
      );
    } else {
      // login_token = req.headers.authorization.split(" ")[1];
      // verify the token and decode the data
      const decodedData = jwt.verify(login_token, process.env.JWT_SECRET_KEY);
      // console.log(decodedData);
      // get the user from the database
      req.user=await userModel.findById(decodedData.jwt_user_id);
      next();
    }
  },
  (err, req, res, next) => {
    next(err);
  }
);

export const isResponcer = handleAsync(
  async (req, res, next) => {
    
    // find the form
    const form = await formModel.findById(req.params.formId);
    // console.log(form);
    // if the form not found
    if (!form) {
      errorThrow("Form not found", 404, "Missing document");
    }
    if (req.user._id.toString() !== form.creator.toString()) {
      req.form = form;
      next()
      
    }
    else{
      errorThrow(
        `You are not allowed to access this resource`,
        403,
        "Permission denied"
      );
    }
  },
  (err, req, res, next) => {
    next(err);
  }
);

export const isEditor = handleAsync(
  async (req,res,next) => {
    // find the form
    const form = await formModel.findById(req.params.formId);
// if the form not found
    if(!form){
      errorThrow("Form not found",404,"Missing document")
    }
    if (req.user._id.toString() === form.creator.toString()) {
      req.form = form;
      next();
    }
    else{
      errorThrow(
        `You are not allowed to access this resource`,
        403,
        "Permission denied"
      );
    }
    
  },
  (err, req, res, next) => {
    next(err);
  }
);
