import handleAsync from "async-error-handler"
import { formModel } from "../DB/formModel.js";
import { fileDeleteFromCloudinary, fileUploadToCloudinary } from "../middlewares/imageUploadToFile.js";
import { sendMail } from "../utils/sendEmail.js";
import {createHash} from 'crypto'
import { errorThrow } from "../utils/errorHandler.js";

// delete the form of 
export const getAllFormOfTheOwner = handleAsync(
  async (req, res) => {
    // console.log(req.user);
    const allForm = await formModel.find({ creator :req.user._id});
// console.log(allForm);
    res.status(200).json({
      success: true,
      allForm,
    });
},
  (err, req, res, next) => next(err)
)
export const handleUserFormCreation = handleAsync(
  async (req, res) => {
    const {formTitle,formHeadingText} = req.body;

    const hashSecret = Date.now().toString()+process.env.HASH_SECRET

    const uniqueLink = createHash('sha256').update(hashSecret).digest('hex')

    const newForm = await formModel.create({
      creator: req.user._id,
      formTitle: formTitle,
      header: { formHeadingText: formHeadingText },
      uniqueLink: uniqueLink,
    });

    res.status(201).json({
        success: true,
        newForm,
    })
  },
  (err, req, res, next) => next(err)
);

// delete the form of 
export const deleteTheForm = handleAsync(
  async (req, res) => {
    // get the form id from the url
    const formId = req.params.formId;
    const deletedForm = await formModel.findByIdAndDelete(formId);

    if(!deletedForm){
      errorThrow("Form not found",404,"Missing document")
    }

    res.status(200).json({
      success: true,
      deletedForm,
    
  })
},
  (err, req, res, next) => next(err)
)

// get the form of given id
export const getTheForm = handleAsync(
  async (req, res) => {
    // get the form id from the url
    const formId = req.params.formId;
    const theForm = await formModel.findById(formId);

    if(!theForm){
      errorThrow("Form not found", 404, "Missing document");
    }

    res.status(200).json({
      success: true,
      theForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update the form title
export const updateFormTitle = handleAsync(
  async (req, res) => {
    // get the form title from the request body
    const { formTitle } = req.body;
    // get the form id from the url
const formId = req.params.formId;
// find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(formId,{
      formTitle: formTitle,
    },{new:true});

    if(!newForm){
      errorThrow("Form not found",404,"Missing document")
    }

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// add form header image
export const addFormHeaderImage = handleAsync(
  async (req, res) => {
    // get the form title from the request body
    const file = req.files;
    // get the form id from the url
    const formId = req.params.formId;
    // upload file to the cloudinary
    const myCloud = await fileUploadToCloudinary(file.path)
    // find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        headerImage: {
          public_id:myCloud.public_id,
          url: myCloud.secure_url,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update form header image
export const updateFormHeaderImage = handleAsync(
  async (req, res) => {
    // get the form title from the request body
    const file = req.files;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId)
    if(!newForm){
      errorThrow("Form not found", 404, "Missing document");
    }
    // delete the old file from the cloudinary
    await fileDeleteFromCloudinary(newForm.headerImage.public_id)
    // upload file to the cloudinary
    const myCloud = await fileUploadToCloudinary(file.path);
    
    newForm.headerImage.public_id= myCloud.public_id
    newForm.headerImage.url= myCloud.secure_url
    
    await newForm.save()

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update form header font

export const updateFormHeaderFont = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formHeadingFont } = req.body;
    // get the form id from the url
    const formId = req.params.formId;
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(formId)

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
      
    newForm.header.font.text = formHeadingFont;

    await newForm.save()
      
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);


export const updateFormHeaderFontSize = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formHeadingFontSize } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId)

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    
    newForm.header.font.size = Number(formHeadingFontSize)
      
    await newForm.save();
     

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update form text font except for the heading and question
export const updateFormFont = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formFont } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId)

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
      
    newForm.textFont=formFont
    
    await newForm.save()

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update form text font size except for the heading and question
export const updateFormFontSize = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formFontSize } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId)

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
      
    newForm.textFontSize= Number(formFontSize),
      
    await newForm.save()

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update only question font size
export const updateQuestionFontSize = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formQuestionFontSize } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }

    newForm.question.font.size = Number(formQuestionFontSize);

    await newForm.save();

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update only question font
export const updateQuestionFont = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formQuestionFont } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId)

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
      
    newForm.question.font.text = formQuestionFont

    await newForm.save()
        
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// share the form via unique link in email
export const shareFormViaEmails = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { emailAddresses,subject,message  } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }

    const url = `${process.env.CLIENT_URL}/form/${newForm.uniqueLink}`;

    const html = `${message}. \n Please fill the form at ${url} \n Thank You`

    await sendMail(emailAddresses,subject,html)

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);


// share the form via unique link
export const createLink = handleAsync(
  async (req, res) => {
    
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }

    const url = `${process.env.CLIENT_URL}/form/view/${newForm.uniqueLink}`;

    res.status(200).json({
      success: true,
      url,
    });
  },
  (err, req, res, next) => next(err)
);

// responce of all questions
export const getAllResponses = handleAsync(
  async (req, res) => {
    
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findById(formId);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }

    const url = `${process.env.CLIENT_URL}/form/view/${newForm.uniqueLink}`;

    res.status(200).json({
      success: true,
      url,
    });
  },
  (err, req, res, next) => next(err)
);
