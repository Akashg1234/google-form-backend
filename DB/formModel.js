import { Schema,model } from "mongoose";


const formSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    formTitle: {
      type: String,
      required: true,
      default: "Untitled Form",
    },

    headerImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    header: {
      formHeadingText: {
        type: String,
        required: true,
        default: "Form heading",
      },
      font: {
        type: String,
        default: "Arial",
        style: {
          bold: { type: Boolean, default: false },
          italic: { type: Boolean, default: false },
          underline: { type: Boolean, default: false },
        },
        size: {
          type: Number,
          default: 16,
        },
      },
    },
    question: {
     
      font: {
        type: String,
        default: "Arial",
        style: {
          bold: { type: Boolean, default: false },
          italic: { type: Boolean, default: false },
          underline: { type: Boolean, default: false },
        },
        size: {
          type: Number,
          default: 16,
        },
      },
    },
    textFont: {
      type: String,
      default: "Arial",
    },
    textFontSize: {
      type: Number,
      default: 16,
    },

    // refencing to the question model
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    responseValidator: {
      customErrorMessage: {
        type: String,
        default: "Incorrect answer",
      },
    },
    // referencing to the response model
    responses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Response",
      },
    ],
    // color theme of the form
    colorTheme: {
      formColor: String,
      backGroundColor: String,
    },
    // form settings
    settings: {
      // is the form used for quiz
      isQuized: {
        type: Boolean,
        default: false,
      },
      // should responce will collect email
      isCollectEmail: {
        type: Boolean,
      },
      // is the question shuffled
      isSuffled: {
        type: Boolean,
      },
      isShowProgressBar: {
        type: Boolean,
      },
      // responce submit confirmmation message
      confirmationMessage: {
        type: String,
        default: "Thank you for submitting the response",
      },
    },
    // will every question required to be answered

    default: {
      isQuestionRequired: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

export const formModel = model("Form", formSchema);