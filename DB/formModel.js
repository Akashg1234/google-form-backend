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
      default: "Untitled question",
    },
    formHeading: {
      type: String,
      required: true,
      default: "Form heading",
      style: {
        bold: false,
        italic: false,
        underline: false,
      },
    },
    headerImage: {
      public_id: {
        type: "String",
      },
      url: {
        type: "String",
      },
    },
    headerFont: {
      type: String,
      default: "Arial",
    },
    headerFontSize: {
      type: Number,
      default: 16,
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
    questions: [
      {
        questionTitle: {
          type: String,
          default: "",
        },
        description: {
          type: String,
        },
        imageOfTheQuestion: {
          public_id: {
            type: "String",
          },
          url: {
            type: "String",
          },
        },
        typeOfAnsField: { type: String },
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
      },
    ],

    responseValidator: {
      customErrorMessage: {
        type: String,
        default: "Incorrect answer",
      },
    },

    responses: [{}],
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