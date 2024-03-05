import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sentmymail(val,mymailid) {
  const htmla=`
  <h1>taskname:${val.taskname}</h1>
  <p>Discription:${val.discription}</p>
  <p>Details:${val.details}</p>
  <p>Starting Date:${val.startingdate}</p>
  <p>Ending Date:${val.endingdate}</p>
  <p>Taskcompletion:${val.taskcompletion}</p>
  `
  const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.G_MAIL,
          pass: process.env.G_MAIL_PASSWORD,
        },
      });
  
      await transporter.sendMail({
        from: process.env.G_MAIL,
        to: mymailid,
        subject: "REMINDER MAIL-TaskManagement Mail",
        html:htmla,
        text:"mail send form Taskmangement App"
      });
};
