import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    questionTitle: {
      type: String,
      default: "Untitled question",
      style: {
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false },
      },
    },
    // question description
    questionDescription: {
      type: String,
    },
    // question type
    fileOfTheQuestion: {
      // Allow only specific file types
      isAllowedSpecificFileType: {
        type: Boolean,
        default: false,
      },
      // Allow only specific file types
      typeOfTheFile: [
        {
          type: String,
          enum: ["pdf", "doc", "docx", "jpg", "png", "jpeg"],
        },
      ],
      // image of the question public_id and its url
      imageOfTheQuestion: {
        public_id: {
          type: "String",
        },
        url: {
          type: "String",
        },
      },
      // video of the question public_id and its url
      videoOfTheQuestion: {
        public_id: {
          type: "String",
        },
        url: {
          type: "String",
        },
      },
      // maximum size of the file
      fileSize:{
        type:Number,
      },
      // number of files
      numberOfFiles:{
        type:Number,
      }

    },
    // which type of answer will be given to the question
    typeOfAnsField: { type: String },
    // is this question required to be answered
    required: {
      type: Boolean,
    },
    questionFont: {
      type: String,
      default: "Arial",
    },
    questionFontSize: {
      type: Number,
      default: 16,
    },
    answer: {
      shortAnswer: {
        type: String,
      },
      pargraphAnswer: {
        type: String,
      },
      mcq: {
        type: Boolean,
      },
      mcqGrid: {
        type: Boolean,
      },
      checkBox: {
        type: Boolean,
      },
      dropDown: {
        type: Boolean,
      },
      suffelOptionOrder: {
        type: Boolean,
        default: false,
      },
      givenAnswerOptions: [
        {
          type: Schema.Types.Mixed,
        },
      ],
      correctAnswerOptions: {
        type: Schema.Types.Mixed,
      }
    },
  },
  { timestamps: true }
);

export const questionModel = model("Question", questionSchema);