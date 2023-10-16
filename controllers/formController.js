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
// form creation by user
export const handleUserFormCreation = handleAsync(
  async (req, res) => {
    const {formTitle,formHeadingText} = req.body;
// creating thr hash secret
    const hashSecret = Date.now().toString()+process.env.HASH_SECRET
// create the unique link
    const uniqueLink = createHash('sha256').update(hashSecret).digest('hex')
// now cr4eate the form
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
    
    // find the form by id and update the form title
    let newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // get the form title from the request body
    if (req.file) {
      const file = req.file
      // console.log(file);
      // upload file to the cloudinary
      const uploadResult = await fileUploadToCloudinary(file.path);

      // console.log("upload result: ", uploadResult);

      if (!uploadResult) {
        errorThrow("Error in file upload", 400, "Internal or server error");
      } else {
        // assign the asset credentials
        newForm.headerImage.public_id = uploadResult.public_id;
        newForm.headerImage.url = uploadResult.secure_url;

        await newForm.save();

        res.status(200).json({
          success: true,
          // message: "Image has been uploaded succesfully",
          newForm,
        });
      }
    }
    else{
      errorThrow("File not found", 404, "Missing error");
    }
   
  },
  (err, req, res, next) => next(err)
);

// update form header image
export const updateFormHeaderImage = handleAsync(
  async (req, res) => {
    // get the form title from the request body
    const file = req.file;
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id)
    if(!newForm){
      errorThrow("Form not found", 404, "Missing document");
    }
    // delete the old file from the cloudinary
    await fileDeleteFromCloudinary(newForm.headerImage.public_id)
    // upload file to the cloudinary
    const myCloud = await fileUploadToCloudinary(file.path);
    // assign credentials
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

// update form header image
export const deleteteFormHeaderImage = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id)
    if(!newForm){
      errorThrow("Form not found", 404, "Missing document");
    }
    // delete the old file from the cloudinary
    await fileDeleteFromCloudinary(newForm.headerImage.public_id)
    // removing image credentials
    newForm.headerImage.public_id= undefined;
    newForm.headerImage.url= undefined;
    
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
    // assign header font text
    newForm.header.font.text = formHeadingFont;

    await newForm.save()
      
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// update form header font size
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
    // assign header font size
    newForm.header.font.size = Number(formHeadingFontSize)
    // save the form
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
    // update generel form font
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
    // assign text font size
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
// assign the question font size
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
      // assigning the question font
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
// creating the url
    const url = `${process.env.CLIENT_URL}/form/${newForm._id}/${newForm.uniqueLink}/viewform`;
// creating the html template for mail
    const html = `<b>Hi there!</b>
                    <br>
                        <i>
                        <br>${message}. <br><br>
                        </i> \n Please fill the form at 
                        <a href="${url} "> Form Link </a> <br><br>
                        <i>
                        <br>
                        Regards,
                        <br>
                        <b>Ishan</b>
                        <br>
                        </i> Thank You`;

    const data={
      subject:subject,
      to:emailAddresses,
      html:html
    }
// send the mail 
    await sendMail(data)

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
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
// create the unique link
    const url = `${process.env.FRONT_END_URL}/form/view/${newForm.uniqueLink}`;

    res.status(200).json({
      success: true,
      url,
    });
  },
  (err, req, res, next) => next(err)
);

// responce of all questions ** LOGIC HAVE TO ADD**
export const getAllResponses = handleAsync(
  async (req, res) => {
    
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const responseWithQuestion = await formModel
      .findById(formId)
      .populate("questions")
      .populate("responses");

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }

    res.status(200).json({
      success: true,
      responseWithQuestion,
    });
  },
  (err, req, res, next) => next(err)
);

// suffel the questions
export const setQuestionSuffelHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question suffle
    newForm.settings.isSuffled = req.body.questionSuffle;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// set the header font style
export const setFormHeaderFontBoldStyleHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question suffle
    newForm.header.font.style.bold = req.body.bold;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header font style italic
export const setFormHeaderFontItalicStyleHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question suffle
    newForm.header.font.style.italic = req.body.italic;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header font style underline
export const setFormHeaderFontUnderlineStyleHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form header font style underline 
    newForm.header.font.style.underline = req.body.underline;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header font style underline
export const setFormQuestionFontUnderlineStyleHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question underline style
    newForm.question.font.style.underline = req.body.underline;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header font style underline
export const setFormQuestionFontBoldStyleHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question style
    newForm.question.font.style.bold = req.body.bold;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header font style italic
export const setFormQuestionFontItalicStyleHandler = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question style
    newForm.question.font.style.italic = req.body.italic;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// set the header description
export const setFormHeaderDescriptionHandler  = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question style
    newForm.header.formDescriptionText.description = req.body.formDescription;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// set the header description font
export const setFormHeaderDescriptionFont  = handleAsync(
  async (req, res) => {
    
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set form question style
    newForm.header.formDescriptionText.font.text = req.body.formDescriptionFont;

    await newForm.save();
    
    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// set the header description font size
export const setFormHeaderDescriptionFontSize  = handleAsync(
  async (req, res) => {
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set header description font size
    newForm.header.formDescriptionText.font.size =
      req.body.formDescriptionFontSize;

    await newForm.save();

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header description font bold
export const setFormHeaderDescriptionStyleBold  = handleAsync(
  async (req, res) => {
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set header description font bold
    newForm.header.formDescriptionText.font.style.bold =
      req.body.formDescriptionBold;

    await newForm.save();

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);
// set the header description font italic
export const setFormHeaderDescriptionStyleItalic  = handleAsync(
  async (req, res) => {
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set header description font bold
    newForm.header.formDescriptionText.font.style.italic =
      req.body.formDescriptionItalic;

    await newForm.save();

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);

// set the header description font underline
export const setFormHeaderDescriptionStyleUnderline  = handleAsync(
  async (req, res) => {
    // find the form by id and update the form title
    const newForm = await formModel.findById(req.form._id);

    if (!newForm) {
      errorThrow("Form not found", 404, "Missing document");
    }
    // set header description font underline
    newForm.header.formDescriptionText.font.style.underline =
      req.body.formDescriptionUnderline;

    await newForm.save();

    res.status(200).json({
      success: true,
      newForm,
    });
  },
  (err, req, res, next) => next(err)
);