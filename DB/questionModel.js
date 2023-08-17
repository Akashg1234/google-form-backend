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
    // image of the question public_id and its url
    imageOfTheQuestion: {
      left: {
        type: Boolean,
      },
      right: {
        type: Boolean,
      },
      center: {
        type: Boolean,
      },
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      caption: {
        type: String,
      },
    },
    // video of the question public_id and its url
    videoOfTheQuestion: {
      left: {
        type: Boolean,
        default:true
      },
      right: {
        type: Boolean,
      },
      center: {
        type: Boolean,
      },
      url: {
        type: String,

      },
      caption: {
        type: String,
      },
    },
    // question type
    ansFileOfTheQuestion: {
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
      
      // maximum size of the file
      fileSize: {
        type: Number,
      },
      // number of files
      numberOfFiles: {
        type: Number,
      },
    },
    // which type of answer will be given to the question
    typeOfAnsField: {
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
    },
    // is this question required to be answered
    required: {
      type: Boolean,
    },
    // question font
    questionFont: {
      type: String,
      default: "Arial",
    },
    // question font size
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
      // suffel the option order of the answer option
      suffelOptionOrder: {
        type: Boolean,
        default: false,
      },
      // the given answer options/option
      givenAnswerOptions: [
        {
          type: Schema.Types.Mixed,
        },
      ],
      // the correct answer options/option
      correctAnswerOptions: [
        {
          type: Schema.Types.Mixed,
        },
      ],
    },
  },
  { timestamps: true }
);

export const questionModel = model("Question", questionSchema);