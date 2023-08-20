import { Schema, model } from "mongoose";

const responceSchema = new Schema({
  submitedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  question: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
      responces: { type: Schema.Types.Mixed },
    },
  ],

  responces: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  uploadedFiles: [
    {
      type: String, // Store file paths or links for file upload responses
    },
  ],
},{timestamps:true});

export const responceModel = model("Responce", responceSchema);