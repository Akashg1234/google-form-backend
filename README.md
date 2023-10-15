
# Google Forms Clone - Backend

🚀 Welcome to the Google Forms Clone backend! This awesome server-side component powers your innovative form creation and management app.

## Features of the form 🌟

- ✅ User Authentication
- ✅ Create, Retrieve, and Delete Forms
- ✅ View Form Details
- ✅ Rich Text Formatting (Bold, Italic, Underline)
- ✅ Add Form Description with Text Formatting
- ✅ Stunning Header Customization
- ✅ Cloudinary Integration for Image Uploads
- ✅ Font Customization (Header and Form)
- ✅ Share Forms via Email or Unique Links

## Get Started 🚀

1. **Clone the Repository**:
   bash
   ```
   git clone https://github.com/Akashg1234/google-form-backend.git
   ```
2. **Install Dependencies**:
   ```
   cd /google-form-backend
   npm install
    ```
3. **Start the Server**:
   ```
   npm start
   ```
   
4. **API End Points**
   #### User

   ```
   /user/register : User register
   /user/login : User login
   /user/logout : User logout
   ```
   #### Form

   ```
   /form/all-forms :Get all forms crreated by user
   /form/create-form :Create a form
   /form/delete-form/:formId : Delete a specific form
   /form/get-form/:formId : Get a specific form
   /form/edit-form/title/:formId : Edit the form title
   /form/edit-form/form-header-font/:formId : Update the form header font
   /form/edit-form/form-header-font-size/:formId : Update the form header font size
   /form/edit-form/form-font/:formId : Update the form font
   /form/edit-form/form-font-size/:formId : Update form font size
   /form/edit-form/form-question-font/:formId : Update the question font
   /form/edit-form/form-question-font-size/:formId : Update the question font size
   /form/edit-form/send-form-via-email/:formId : Send the form via email
   /form/edit-form/create-form-link/:formId : Create the form link which can share by email
   /form/set-form-question-suffel/:formId : This will suffel the questions of the form
   /form/set-header-font-bold/:formId : Set the header font bold
   /form/set-header-font-italic/:formId : Set the header font italic
   /form/set-header-font-underline/:formId : Set the header font underline
   /form/add-image-header/:formId : Add an image to the header section
   /form/update-image-header/:formId : Update the header image
   /form/delete-image-header/:formId : Delete the image header image
   ```

   #### Question

   ```
   /question/create-question/:formId : Create a question
   /question/delete-question/:formId/question/:questionId : Delete the question
   /question/update-question-title/:formId/question/:questionId : Update the question title
   /question/update-question-type/:formId/question/:questionId : Update the type of question
   /question/add-question-answer/:formId/question/:questionId : Add question answer
   /question/add-image-question-caption/:formId/question/:questionId : Add image cation
   /question/delete-image-question-caption/:formId/question/:questionId : Remove the image question
   /question/update-image-allignment-to-question/:formId/question/:questionId : Update the image allignment in the section
   /question/update-video-allignment-to-question/:formId/question/:questionId : Update the video allignment in the section
   /question/set-answer-suffel-option/:formId/question/:questionId : Option for suffel the answers or not
   /question/add-correct-answer-option/:formId/question/:questionId : Add the correct answers
   /question/set-answer-mandate/:formId/question/:questionId : Set question mandatory or not
   /question/set-question-title-style-bold/:formId/question/:questionId : Set question format bold
   /question/set-question-title-style-italic/:formId/question/:questionId : Set question format italic
   /question/set-question-title-style-underline/:formId/question/:questionId :  Set question format underline
   /question/set-required-specific-file-type/:formId/question/:questionId : Set specific special file type checkbox
   /question/set-specific-file-type/:formId/question/:questionId : Choose the type of file
   /question/set-file-size/:formId/question/:questionId : Set the file size
   /question/set-number-of-files/:formId/question/:questionId : Set number of file
   /question/add-image-to-question/:formId/question/:questionId : Add an image to the question
   /question/delete-image-to-question/:formId/question/:questionId : Remove the image of the question
   /question/update-image-to-question/:formId/question/:questionId : Update the image of the question
   /question/add-video-caption-to-question/:formId/question/:questionId : Add video caption to the question
   /question/delete-video-caption-to-question/:formId/question/:questionId : Remove video caption to the question
   /question/add-video-to-question/:formId/question/:questionId : Add video to the question
   /question/delete-video-to-question/:formId/question/:questionId : Remove video to the question
   ```
