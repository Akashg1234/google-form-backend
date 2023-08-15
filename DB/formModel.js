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
        type: "String",
      },
      url: {
        type: "String",
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
    textFont: {
      type: String,
      default: "Arial",
    },
    textFontSize: {
      type: Number,
      default: 16,
    },
    formDescription: {
      type: String,
      style: {
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false },
        orderedList: { type: Boolean, default: false },
        unorderedList: { type: Boolean, default: false },
      },
      default: "Form description",
      required: true,
      link: {
        text: String,
        url: String,
      },
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

    colorTheme: {
      formColor: String,
      backGroundColor: String,
    },

    settings: {
      isQuized: {
        type: Boolean,
        default: false,
      },
      isCollectEmail: {
        type: Boolean,
      },
      isSuffled: {
        type: Boolean,
      },
      isShowProgressBar: {
        type: Boolean,
      },
      confirmationMessage: {
        type: String,
        default: "Thank you for submitting the response",
      },
    },
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