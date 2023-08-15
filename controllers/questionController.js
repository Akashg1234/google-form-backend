import handleAsync from "async-error-handler";
import { questionModel } from "../DB/questionModel";
import { formModel } from "../DB/formModel";

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
      { formId },
      {
        $pull: {
          questions: { questionId },
        },
      }
    );

    await newForm.save();

    res.status(201).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);