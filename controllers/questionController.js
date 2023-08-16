import handleAsync from "async-error-handler";
import { questionModel } from "../DB/questionModel";
import { formModel } from "../DB/formModel";
import { mediaCloud } from "../index.js";
import { errorThrow } from "../utils/errorHandler";

export const createQuestion= handleAsync(async (req, res) => {
    const { questionTitle, typeOfAnsField, givenAnswerOptions } = req.body;
    const newQuestion = await questionModel.create({
      questionTitle: questionTitle,
      typeOfAnsField: typeOfAnsField,
      givenAnswerOptions: givenAnswerOptions,
    
    });
    res.status(201).json({
        success:true,
        newQuestion
    })
},(err,req,res,next)=>next(err))


export const deleteQuestion = handleAsync(
  async (req, res) => {

    const questionId = req.params.questionId;
    const formId = req.params.formId;

    const newQuestion = await questionModel.findByIdAndDelete({
        questionId
    });

    await newQuestion.save();

    const newForm =await formModel.findByIdAndUpdate(
      { _id:formId },
      {
        $pull: {
          questions: { questionId },
        },
      }
    );

    await newForm.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

export const updateQuestionTitle = handleAsync(
  async (req, res) => {
    // get new question title from the body
    const { questionTitle} = req.body;
    // get the questionId from the params
    const questionId = req.params.questionId;
    // find the question and update it with the new title and return the new document
    
    const newQuestion = await questionModel.findByIdAndUpdate({
      questionId},{
      questionTitle: questionTitle,
    },{new:true});
    res.status(201).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

export const updateTypesOfQuestion = handleAsync(
  async (req, res) => {
    // get new question title from the body
    const { questionType } = req.body;
    // get the questionId from the params
    const questionId = req.params.questionId;

    const newQuestion = await questionModel.findByIdAndUpdate(
      {
        questionId,
      },
      {
        typeOfAnsField: questionType,
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

export const addMultipleAnswer = handleAsync(
  async (req, res) => {
    // get new question title from the body
    const { ansOption } = req.body;
    // get the questionId from the params
    const questionId = req.params.questionId;

    const newQuestion = await questionModel.findById(
      {
        questionId,
      });

    newQuestion.answer.givenAnswerOptions.push(ansOption);

    await newQuestion.save();

    res.status(201).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

export const addImageToQuestion = handleAsync(
  async (req, res) => {
    let newQuestion = await questionModel.findById({
      questionId,
    });
    if (!newQuestion) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // get new question title from the body
    const file = req.file;
    // get the questionId from the params
    const questionId = req.params.questionId;

    newQuestion.answer.givenAnswerOptions.push(ansOption);

    await newQuestion.save();

    res.status(201).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

