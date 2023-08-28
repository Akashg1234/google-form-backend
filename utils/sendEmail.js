import handleAsync from "async-error-handler";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";
import { errorThrow } from "./errorHandler.js";

export const sendMail = handleAsync(
  async (data, req, res, next) => {
    let testAccount = await createTestAccount();

    // Create a SMTP transporter object
    let transporter = createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });


    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@gamil.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      html: data.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  },
  (err, req, res, next) => {
    next(err);
  }
);
