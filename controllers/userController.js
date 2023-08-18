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
  async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({  email })
      .select("+password");

    if (!user) {
      errorThrow("User not found", 404, "Missing document");
    }

    if (user && (await user.comparePassword(password))) {
      sendAllToken(user, "Login successful", res, 200);
    } else {
      errorThrow("Invalid Credentials", 401, "Log in error");
    }
  },
  (err, req, res, next) => next(err)
);

export const handleUserLogOut = handleAsync(
  async (req, res) => {
    // set 'login_token' to null and expire it now

    res
      .clearCookie("login_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Log out user",
      });
  },
  (err, req, res, next) => next(err)
);

