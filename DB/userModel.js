import { Schema,model } from "./dbUtils";

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
        type: "String",
        required: true,
        default: "public_id",
      },
      url: {
        type: "String",
        required: true,
        default: "url",
      },
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password should be atleast 8 charecter long"],
      select: false,
    },
    ResetPasswordToken: String,
    ResetPasswordExpire: Date,
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);