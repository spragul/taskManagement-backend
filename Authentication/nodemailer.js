import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sentmymail(val) {
  const htmla = `
    <h1>taskname:${val.taskname}</h1>
    <p>Discription:${val.discription}</p>
    <p>Details:${val.details}</p>
    <p>Starting Date:${val.startingdate}</p>
    <p>Ending Date:${val.endingdate}</p>
    <p>Taskcompletion:${val.taskcompletion}</p>
    `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.G_MAIL,
      pass: process.env.G_MAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.G_MAIL,
    to: val.email,
    subject: "Reset password",
    html: htmla,
    text: "link",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent" + info.response);
    }
  });
}
