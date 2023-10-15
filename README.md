
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
   git clone https://github.com/yourusername/yourproject.git
   ```
2. **Install Dependencies**:
   ```
   cd yourproject/backend
   npm install
    ```
3. **Start the Server**:
   ```
   npm start```
   
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
