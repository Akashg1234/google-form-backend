import handleAsync from "async-error-handler";
import { responceModel } from "../DB/responseModel.js";
import { formModel } from "../DB/formModel.js";
import { questionModel } from "../DB/questionModel.js";
import { errorThrow } from "../utils/errorHandler.js";
// submit response
export const submitResponse = handleAsync(async(req,res,next)=>{
    const {  questionId } = req.params;

    const form = await formModel.findById(req.form._id);

    const question = await questionModel.findById(questionId)

    if(!form || !question){
      errorThrow("Form or question not found", 404, "Missing document");
    }
    // create submited response
    const submitedResponses = await responceModel.create({
      submitedBy: req.user._id,
      //   form id of the submited response
      formId: req.form._id,
      // add the question id to the submited response
      question: question._id,
    });

// array of the responce
    const arrayOfResponses = req.body.responce
    
// push the responce to the array of responce
    for (let singleResponse of arrayOfResponses) {
      submitedResponses.responces.push(singleResponse);
    }
// save the submited response
    await submitedResponses.save();
// push the submited response to the array of the 
    form.responses.push(submitedResponses._id)
// save the form
    await form.save();
    
    question.answer.responces.push(submitedResponses._id)
// save the question
    await question.save();

    res.status(201).json({
        success:true,
        submitedResponses
    })

    
},(err,req,res,next)=>next(err))

// get perticular response
export const getResponse = handleAsync(async(req,res,next)=>{
    const {questionId} = req.params
    
    // create submited response
    const submitedResponses = await responceModel.find({
    //   form id of the submited response
      formId:req.form._id,
      // add the question id to the submited response
      question:questionId
    });

    res.status(200).json({
        success:true,
        submitedResponses
    })

},(err,req,res,next)=>next(err))

// get all response
export const getAllResponse = handleAsync(async(req,res,next)=>{
    
    // create submited response
    const getAllResponses = await responceModel.find({ formId: req.form._id });

    res.status(200).json({
        success:true,
        getAllResponses
    })

},(err,req,res,next)=>next(err))
// get response of a user
export const getResponseOfAUser = handleAsync(async(req,res,next)=>{
    const {userId,questionId} = req.params
    
    // create submited response
    const getResponsesOfTheUser = await responceModel.find({
      submitedBy: userId,
      formId: req.form._id,
      question:questionId,
    });

    res.status(200).json({
      success: true,
      getResponsesOfTheUser,
    });

},(err,req,res,next)=>next(err))
// get response of a user
export const getResponseOfId = handleAsync(async(req,res,next)=>{
    const {responceId} = req.params
    
    // create submited response
    const getTheResponses = await responceModel.find({
      _id: responceId,
      formId: req.form._id,
    });

    res.status(200).json({
      success: true,
      getTheResponses,
    });
    
},(err,req,res,next)=>next(err))
