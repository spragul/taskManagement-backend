import express from "express";
import { completestatus, createtask, deletetask, edittask, getalltask, getdata } from "../Controllers/Taskcontroller.js";
import { validate } from "../Authentication/auth.js";
const router=express.Router();

router.get('/',validate,getalltask);
router.get('/:id',validate,getdata);
router.post('/createtask',validate,createtask);
router.put('/edit',validate,edittask)
router.delete('/delete/:id',validate,deletetask);
router.patch('/complete/:id',validate,completestatus);

export default router;