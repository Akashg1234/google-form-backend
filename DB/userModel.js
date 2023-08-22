import { Schema,model } from "./dbUtils.js";
import bcrypt from "bcrypt";
import { randomBytes, createHash } from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: {
      public_id: {
        type: String
      },
      url: {
        type: String
      },
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password should be atleast 8 charecter long"],
      select: false,
    },
    formsCreated: [{
      ref: "Form",
      type: Schema.Types.ObjectId,
    }],
    ResetPasswordToken: String,
    ResetPasswordExpire: Date,
  },
  { timestamps: true }
);



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 15);
  next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

userSchema.methods.getPasswordResetToken = function () {
  let resetToken = randomBytes(100).toString("hex");

  this.resetToken = createHash("sha256").update(resetToken).digest("hex");
  this.resetTokenExpire = Date.now() + 1800000;

  return resetToken;
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ jwt_user_id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
};
export const userModel = model("User", userSchema);