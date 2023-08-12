import handleAsync from "async-error-handler";
import { userModel } from "../DB/userModel";

export const handleUserRegister = handleAsync(async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ "contact.email": email });

    if (user) {
      errorThrow("User Allready Exist", 409, "Missing document");
    }
    else {
 user = await userModel.create({ email, password });
res.status(201).json({ success: true, user, token });
    }
  
  // res.redirect("/login");
  // res.send("User Registered");

},(err,req,res,next)=>next(err))

export const handleUserLogin = handleAsync(
  async (req, res) => {},
  (err, req, res, next) => next(err)
);

export const handleUserLogOut = handleAsync(
  async (req, res) => {},
  (err, req, res, next) => next(err)
);

export const handleUserForm = handleAsync(
  async (req, res) => {},
  (err, req, res, next) => next(err)
);