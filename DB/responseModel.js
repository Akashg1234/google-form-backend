import { Schema, model } from "mongoose";

const responceSchema = new Schema(
  {
    submitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
    },
    question:{
        type: Schema.Types.ObjectId,
        ref: "Question",
      },

    responces: [
      {
        type: String, // Store the response of the question,
      },
    ],
    uploadedFiles: [
      {
        type: String, // Store file paths or links for file upload responses
      },
    ],
  },
  { timestamps: true }
);

export const responceModel = model("Responce", responceSchema);