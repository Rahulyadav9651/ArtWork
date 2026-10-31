// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Rahul',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;




import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const mailSender = async (email, title, body) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: title,
      htmlContent: body,
      sender: {
        name: "Artify",
        email: process.env.BREVO_FROM_EMAIL,
      },
      to: [{ email }],
    });

    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error(
      "Brevo email error:",
      error.statusCode,
      error.message
    );
    throw error;
  }
};

export default mailSender;
