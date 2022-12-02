import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE
  ,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});
//"wzvejwzfgsahpxmz"
export default function sendMail(subject: string, activationLink: string,email:string) {
  let html = `<b>${activationLink}</b>`;

  const mailOptions = {
    from: "Activation Service",
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
}
