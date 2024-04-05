import { sentmymail } from "./nodemailer.js";
import { CronJob } from "cron";
import dotenv from "dotenv";
import TaskModel from "../Model/Task-Schema.js";
dotenv.config();

export const remindermail = () => {
  const job = CronJob.from({
    cronTime: "1 47  * * * *",
    onTick: async function () {
      console.log("working");
      let today = new Date();
      let todaydate = new Date(today.toISOString());
      let tday = String(todaydate.getDate()).padStart(2, "0");
      let tmonth = String(todaydate.getMonth() + 1).padStart(2, "0");
      let tyear = todaydate.getFullYear();
      let tmin = String(todaydate.getMinutes()).padStart(2, "0");
      let thr = String(todaydate.getHours() + 1).padStart(2, "0");
      console.log("t", tday, tmonth, tyear, thr, tmin);
      const task = await TaskModel.find({});
      task.map((val) => {
        if (val.taskcompletion === false) {
          let eday = String(val.endingdate.getDate()).padStart(2, "0");
          let emonth = String(val.endingdate.getMonth() + 1).padStart(2, "0");
          let eyear = val.endingdate.getFullYear();
          let emin = String(val.endingdate.getMinutes()).padStart(2, "0");
          let ehr = String(val.endingdate.getHours() + 1).padStart(2, "0");
          console.log(eday, emonth, eyear, ehr, "e");
          if (tday == eday - 1 && tmonth == emonth && tyear == eyear) {
            //one data before
            if (thr >= ehr && thr <= ehr + 1) {
              let myemailid = val.email;
              sentmymail(val);
            }
          } else if (tday == eday && tmonth == emonth && tyear == eyear) {
            //today one hr
            if (thr >= ehr && thr <= ehr + 1) {
              sentmymail(val);
            }
          }
        }
      });
    },
    start: true,
    timeZone: "Asia/Kolkata",
  });
};
