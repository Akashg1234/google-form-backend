import handleAsync from "async-error-handler"
import { formModel } from "../DB/formModel";
import { fileDeleteFromCloudinary, fileUploadToCloudinary } from "../middlewares/imageUploadToFile";

export const handleUserFormCreation = handleAsync(
  async (req, res) => {
    const {formTitle,formHeadingText} = req.body;

    const newForm = await formModel.create({
      creator: req.body,
      formTitle: formTitle,
      header:{formHeadingText: formHeadingText},
    });

    res.status(201).json({
        success: true,
        newForm,
    })
  },
  (err, req, res, next) => next(err)
);


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
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        header: {
          font:formHeadingFont,
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


export const updateFormHeaderFontSize = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formHeadingFontSize } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        header: {
          font: {
            size: Number(formHeadingFontSize),
          },
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

// update form text font except for the heading and question
export const updateFormFont = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formFont } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        textFont: formFont,
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

// update form text font size except for the heading and question
export const updateFormFontSize = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formFontSize } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        textFontSize: Number(formFontSize),
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

// update only question font size
export const updateQuestionFontSize = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formQuestionFontSize } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        question: {
            font:{
                size:Number(formQuestionFontSize)
            }
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

// update only question font
export const updateQuestionFont = handleAsync(
  async (req, res) => {
    // form heading font from the request body
    const { formQuestionFont } = req.body;
    // get the form id from the url
    const formId = req.params.formId;

    // find the form by id and update the form title
    const newForm = await formModel.findByIdAndUpdate(
      formId,
      {
        question: {
          font: formQuestionFont,
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
