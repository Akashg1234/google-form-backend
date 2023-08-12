import jwt from "jsonwebtoken";
import { errorThrow } from "../utils/errorHandler.js";
import handleAsync from "async-error-handler";
import { userModel } from "../DB/userModel.js";

export const isAuthenticated = handleAsync(
  async (req, res, next) => {
    // get the jwt token from the cookie
    let decodedData = null;

    if (
      !req.headers.authorization &&
      !req.headers.authorization.startsWith("Bearer")
    ) {
      errorThrow(
        `Please log in to access this resource`,
        401,
        "Permission denied"
      );
    } else {
      const login_token = req.headers.authorization.split(" ")[1];
      // verify the token and decode the data

      decodedData = jwt.verify(login_token, process.env.JWT_SECRET_KEY);
      req.user = await userModel.findById(decodedData.jwt_id);
      next();
    }
  },
  (err, req, res, next) => {
    next(err);
  }
);
