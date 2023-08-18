import handleAsync from "async-error-handler";
import { questionModel } from "../DB/questionModel";
import { formModel } from "../DB/formModel";
import { errorThrow } from "../utils/errorHandler";
import { fileDeleteFromCloudinary, fileUploadToCloudinary } from "../middlewares/imageUploadToFile";
import {URL} from 'url'

const checkUrl=(givenUrl)=>{
  try {
    new URL(givenUrl)
    return true
  } catch (error) {
    return false
  }

}
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

// make is required or not required
// delete to question from the form
export const deleteQuestion = handleAsync(
  async (req, res) => {
// get the questionid , which will be deleted
    const questionId = req.params.questionId;
    // get formid,from which the question will be deleted
    const formId = req.params.formId;

    const newQuestion = await questionModel.findByIdAndDelete({
        questionId
    });

    await newQuestion.save();
// find the form to pull the question id
    const newForm =await formModel.findById(
      { formId }
    );
// pull out the question id from the array of questions of the given form
    newForm.questions.pull(questionId);

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
    res.status(200).json({
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
    res.status(200).json({
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
    // find the form to pull the question id
    const newQuestion = await questionModel.findById({
      questionId,
    });

    newQuestion.answer.givenAnswerOptions.push(ansOption);

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);
// add answer to the question
export const addImageToQuestion = handleAsync(
  async (req, res) => {
    
    // get new question title from the body
    const file = req.files;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });
    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    const myCloud = await fileUploadToCloudinary(file[0].path);
// add the image url and public id to the question 
    newQuestion.imageOfTheQuestion.public_id=myCloud.public_id;
    newQuestion.imageOfTheQuestion.url=myCloud.secure_url;
    
    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);


export const deleteImageToQuestion = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });
    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
// delete the image from cloudinary
    await fileDeleteFromCloudinary(newQuestion.imageOfTheQuestion.public_id);
    // add the image url and public id to the question
    newQuestion.imageOfTheQuestion.public_id = undefined;
    newQuestion.imageOfTheQuestion.url = undefined;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// update the image of the question
export const updateImageToQuestion = handleAsync(
  async (req, res) => {
    // get new question title from the body
    const file = req.files;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
// first delete the image from cloudinary
    await fileDeleteFromCloudinary(newQuestion.imageOfTheQuestion.public_id);
    // upload the new image to cloudinary
    const myCloud = await fileUploadToCloudinary(file[0].path);
// and assign the new image url and public id to the question
    newQuestion.imageOfTheQuestion.public_id = myCloud.public_id;
    newQuestion.imageOfTheQuestion.url = myCloud.secure_url;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);


// add image caption to the question
export const addImageCaptionToQuestion = handleAsync(
  async (req, res) => {
    // get new question title from the body
    const imageCaption = req.body.imageCaption; 
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });
    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
// assign the image caption to the question
    newQuestion.imageOfTheQuestion.caption = imageCaption;
    
    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// delete image caption to the question
export const deleteImageCaptionToQuestion = handleAsync(
  async (req, res) => {
    
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });
    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    newQuestion.imageOfTheQuestion.caption = undefined;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// update the image alignment to the question
export const updateImageAllignmentToQuestion = handleAsync(
  async (req, res) => {
    const imageAlignment = req.body.imageAlignment;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    if(imageAlignment === "left"){
      newQuestion.imageOfTheQuestion.left = true;
    }
    else if(imageAlignment === "right"){
      newQuestion.imageOfTheQuestion.right = true;
    
    }
    else if(imageAlignment === "center"){
      newQuestion.imageOfTheQuestion.center = true;
    
    }

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// Add video to question

export const addVideoCaptionToQuestion = handleAsync(
  async (req, res) => {
    // get caption from body
    const videoCaption = req.body.videoCaption;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });
    if (!newQuestion) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // add the caption to the video object

    newQuestion.videoOfTheQuestion.caption = videoCaption;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// delete the video caption which is associated with the question

export const deleteVideoCaptionToQuestion = handleAsync(
  async (req, res) => {
    
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
// undefine the caption of the video object
    newQuestion.videoOfTheQuestion.caption = undefined;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);
// add video to question
export const addVideoToQuestion = handleAsync(
  async (req, res) => {
    // get new url of the video from the body
    const fileUrl = req.body.fileUrl;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    newQuestion.videoOfTheQuestion.url = fileUrl;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);



// delete the video which is associated with the question

export const deleteVideoToQuestion = handleAsync(
  async (req, res) => {
    
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    newQuestion.videoOfTheQuestion.url = undefined;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// update the video alignment to the question
export const updateVideoAllignmentToQuestion = handleAsync(
  async (req, res) => {
    const videoAlignment = req.body.videoAlignment;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById({
      questionId,
    });

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    if(videoAlignment === "left"){
      newQuestion.videoOfTheQuestion.left = true;
    }
    else if(videoAlignment === "right"){
      newQuestion.videoOfTheQuestion.right = true;
    
    }
    else if(videoAlignment === "center"){
      newQuestion.videoOfTheQuestion.center = true;
    
    }

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);
