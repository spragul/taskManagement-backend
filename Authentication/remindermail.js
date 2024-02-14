 import {sentmymail } from "./nodemailer.js";
import { CronJob } from "cron";
import dotenv from "dotenv";
import TaskModel from "../Model/Task-Schema.js";
dotenv.config();

export const remindermail = () => {
        const job = CronJob.from({
        cronTime: '2 1 12 * * *',
        onTick: async function () {
          let today=new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0');
          let yyyy = today.getFullYear();
          const task=await TaskModel.find({});
          task.map((val)=>{
            let enddate=val.endingdate;
            let dd1=String(enddate.getDate()).padStart(2, '0');
            let mm1=String(enddate.getMonth()+1).padStart(2, '0');
            let yyyy1=enddate.getFullYear();
            if(dd==dd1&&mm==mm1&&yyyy==yyyy1){
                let myemailid=val.email
               sentmymail(val,myemailid);
            }else if(dd==(parseInt(dd1)-1)&&mm==mm&&yyyy==yyyy1){
               let myemailid=val.email
               sentmymail(val,myemailid);
            }
          })
        },
        start: true,
        timeZone: "Asia/Kolkata"
      });
    
  };