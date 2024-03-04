
//express--package
import express from 'express';
import userRouter from "./Routers/user.js"
import taskRoutre from "./Routers/task.js"
import connectDB from './Dbconfig/Dbconfig.js';
import bodyParser from "body-parser"
const app = express()
//dotenv-package
import dotenv from "dotenv"
dotenv.config();
//cors-package
import cors from "cors"
import { remindermail } from './Authentication/remindermail.js';
app.use(cors({ origin: `${process.env.FRONTEND}`}))

app.use(bodyParser.json())
//data base
connectDB();
//mail send based on corn
remindermail();

//use Router
app.use('/user',userRouter);
app.use('/task',taskRoutre);


app.use('/',(req,res)=>{
    res.send({message:"TaskManagement backEnd working"});
})

app.listen(process.env.PORT || '9000', () => (console.log("localhost:9000")))