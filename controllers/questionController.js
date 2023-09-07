import handleAsync from "async-error-handler";
import { questionModel } from "../DB/questionModel.js";
import { formModel } from "../DB/formModel.js";
import { errorThrow } from "../utils/errorHandler.js";
import { fileDeleteFromCloudinary, fileUploadToCloudinary } from "../middlewares/imageUploadToFile.js";
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
    questionTitle: { text: questionTitle }
  });

  if(typeOfAnsField==='Short Answer'){
    newQuestion.typeOfAnsField.shortAnswer = true;
  newQuestion.typeOfAnsField.pargraphAnswer = false;
  newQuestion.typeOfAnsField.mcq = false;
  newQuestion.typeOfAnsField.mcqGrid = false;
  newQuestion.typeOfAnsField.checkBox = false;
  newQuestion.typeOfAnsField.dropDown = false;
    }
    else if(typeOfAnsField==='Long Answer'){
      newQuestion.typeOfAnsField.pargraphAnswer = true;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    }
    else if(typeOfAnsField==='Multiple Choice'){
      newQuestion.typeOfAnsField.mcq = true;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    }
    else if(typeOfAnsField==='Multiple Choice Grid'){
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = true;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    }
    else if(typeOfAnsField==='Checkbox'){
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = true;
      newQuestion.typeOfAnsField.dropDown = false;
    }
    else if(typeOfAnsField==='Drop Down'){
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = true;
    }
  
    newQuestion.answer.givenAnswerOptions.push(givenAnswerOptions);

    await newQuestion.save()
  
  // find the form to pull the question id
  const newForm = await formModel.findById(req.form._id);
  // pull out the question id from the array of questions of the given form
  newForm.questions.push(newQuestion._id);

  await newForm.save();

  res.status(201).json({
    success: true,
    newForm,
    newQuestion,
  });
},(err,req,res,next)=>next(err))

// make is required or not required
// delete to question from the form
export const deleteQuestion = handleAsync(
  async (req, res) => {
// get the questionid , which will be deleted
    const questionId = req.params.questionId;
   
    const deletedQuestion = await questionModel.findByIdAndDelete(questionId);

    // await newQuestion.save();
// find the form to pull the question id
    const newForm =await formModel.findById(req.form._id );
// pull out the question id from the array of questions of the given form
    newForm.questions.pull(deletedQuestion._id);

    await newForm.save();

    res.status(200).json({
      success: true,
      deletedQuestion,
      newForm
    });
  },
  (err, req, res, next) => next(err)
);

export const updateQuestionTitle = handleAsync(
  async (req, res) => {
    // get new question title from the body
    const { questionTitle } = req.body;

    // get the questionid , which will be update
    const questionId = req.params.questionId;

    // find the question and update it with the new title and return the new document

    const newQuestion = await questionModel.findById(questionId)

    if(!newQuestion){
      errorThrow("Question not found",404,"Missing document")
    }

    newQuestion.questionTitle.text=questionTitle;

    await newQuestion.save();

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
    const { typeOfAnsField } = req.body;
    // get the questionId from the params
    const questionId = req.params.questionId;

    const newQuestion = await questionModel.findById(questionId);
    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    
    }

    if (typeOfAnsField === "Short Answer") {
      newQuestion.typeOfAnsField.shortAnswer = true;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    } else if (typeOfAnsField === "Long Answer") {
      newQuestion.typeOfAnsField.pargraphAnswer = true;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    } else if (typeOfAnsField === "Multiple Choice") {
      newQuestion.typeOfAnsField.mcq = true;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    } else if (typeOfAnsField === "Multiple Choice Grid") {
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = true;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = false;
    } else if (typeOfAnsField === "Checkbox") {
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = true;
      newQuestion.typeOfAnsField.dropDown = false;
    } else if (typeOfAnsField === "Drop Down") {
      newQuestion.typeOfAnsField.mcq = false;
      newQuestion.typeOfAnsField.pargraphAnswer = false;
      newQuestion.typeOfAnsField.shortAnswer = false;
      newQuestion.typeOfAnsField.mcqGrid = false;
      newQuestion.typeOfAnsField.checkBox = false;
      newQuestion.typeOfAnsField.dropDown = true;
    }

    await newQuestion.save();

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
    const newQuestion = await questionModel.findById(
      questionId,
    );

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
    const file = req.file;
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    const myCloud = await fileUploadToCloudinary(file.path);
    // add the image url and public id to the question 
    if(myCloud){
    newQuestion.imageOfTheQuestion.public_id = myCloud.public_id;
    newQuestion.imageOfTheQuestion.url = myCloud.secure_url;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
    }
      
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

    let newQuestion = await questionModel.findById(questionId);
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

    let newQuestion = await questionModel.findById(questionId)
    // check if the question is found
    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // delete the image caption to the questio
    newQuestion.imageOfTheQuestion.caption = undefined;
    // save it to the database
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

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    if(imageAlignment === "left"){
      newQuestion.imageOfTheQuestion.left = true;
      newQuestion.imageOfTheQuestion.right = false;
      newQuestion.imageOfTheQuestion.center = false;
    }
    else if(imageAlignment === "right"){
      newQuestion.imageOfTheQuestion.right = true;
    newQuestion.imageOfTheQuestion.center = false;
    newQuestion.imageOfTheQuestion.left = false;
    }
    else if(imageAlignment === "center"){
      newQuestion.imageOfTheQuestion.center = true;
    newQuestion.imageOfTheQuestion.right = false;
    newQuestion.imageOfTheQuestion.left = false;
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

    let newQuestion = await questionModel.findById(questionId);
    // check if the question is found
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

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }

    if(videoAlignment === "left"){
      newQuestion.videoOfTheQuestion.left = true;
      newQuestion.videoOfTheQuestion.right = false;
      newQuestion.videoOfTheQuestion.center = false;
    }
    else if(videoAlignment === "right"){
      newQuestion.videoOfTheQuestion.right = true;
    newQuestion.videoOfTheQuestion.center = false;
    newQuestion.videoOfTheQuestion.left = false;
    }
    else if(videoAlignment === "center"){
    newQuestion.videoOfTheQuestion.center = true;
    newQuestion.videoOfTheQuestion.right = false;
    newQuestion.videoOfTheQuestion.left = false;
    }

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);
// answer suffel handler
export const setAnswerSuffelHandler = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set answer options to suffel or not suffel
    newQuestion.answer.suffelOptionOrder = req.body.suffelOptionOrder;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// answer suffel handler
export const addCorrectAnswer = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set answer options to suffel or not suffel
    newQuestion.answer.correctAnswerOptions.push(req.body.correctAnswerOptions);

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// answer mandate handler
export const setQuestionIsRequired = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.required = req.body.required;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

//question title style bold handler
export const setQuestionTitleStyleBoldHandler = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.questionTitle.style.bold = req.body.bold;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

//question title style italic handler
export const setQuestionTitleStyleItalicHandler = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.questionTitle.style.italic = req.body.italic;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

//question title style underline handler
export const setQuestionTitleStyleUnderlineHandler = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.questionTitle.style.underline = req.body.underline;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// set answer file of the question
export const setAllowedSpecificFileType = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.ansFileOfTheQuestion.isAllowedSpecificFileType =
      req.body.isAllowedSpecificFileType;

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// set answer typeOfTheFile of the question
export const setSpecificFileType = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.ansFileOfTheQuestion.typeOfTheFile.push(req.body.typeOfTheFile);

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// set answer typeOfTheFile of the question
export const setFileSize = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.ansFileOfTheQuestion.fileSize = Number(req.body.fileSize);

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);


// set answer typeOfTheFile of the question
export const setNumberOfFiles = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.ansFileOfTheQuestion.numberOfFiles = Number(req.body.numberOfFiles);

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);


// set responce of the question
export const giveResponse = handleAsync(
  async (req, res) => {
    // get the questionId from the params
    const questionId = req.params.questionId;

    let newQuestion = await questionModel.findById(questionId);

    if (!newQuestion) {
      errorThrow("Question not found", 404, "Missing document");
    }
    // set short answer to the question
    newQuestion.answer.responces.push(req.body.responces);

    await newQuestion.save();

    res.status(200).json({
      success: true,
      newQuestion,
    });
  },
  (err, req, res, next) => next(err)
);