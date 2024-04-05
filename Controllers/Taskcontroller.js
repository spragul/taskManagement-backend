import { getuserId } from "../Authentication/auth.js";
import TaskModel from "../Model/Task-Schema.js";
import UserModel from "../Model/userSchemas.js";

//create a task
export const createtask = async (req, res) => {
  try {
    let task = await TaskModel.findOne({ taskname: req.body.taskname });
    if (!task) {
      let mytask = await TaskModel.create(req.body);
      let userId = await getuserId(req.headers.authorization);
      if (mytask && userId) {
        //push task id in user account
        let user = await UserModel.findByIdAndUpdate(
          {
            _id: userId,
          },
          {
            $push: { tasklist: mytask._id },
          }
        );

        //set usermailid into task
        let task1 = await TaskModel.findByIdAndUpdate(
          {
            _id: mytask._id,
          },
          {
            $set: { email: user.email },
          }
        );
      }
      res
        .status(200)
        .json({ message: "your task is created", mytask, rd: true });
    } else {
      res.status(400).json({ message: "Alredy this task created", rd: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `internal sever error ${error}`, rd: false });
  }
};
//get app task
export const getalltask = async (req, res) => {
  try {
    let userId = await getuserId(req.headers.authorization);
    const tasklist = await UserModel.findOne({ _id: userId }, { tasklist: 1 });
    const task = await TaskModel.find(
      { _id: { $in: tasklist.tasklist } },
      { email: 0 }
    );
    if (task) {
      res.status(200).json({ message: "Get All tasks", task, rd: true });
    } else {
      res.status(204).json({ message: "task list is empty", rd: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `internal sever error ${error}`, rd: false });
  }
};
//get particular task
export const getdata = async (req, res) => {
  try {
    const getonetask = await TaskModel.findOne({ _id: req.params.id });
    if (getonetask) {
      res
        .status(200)
        .json({ message: "Geting Task data", getonetask, rd: true });
    } else {
      res.status(204).json({ message: "Invaide data", rd: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `internal sever error ${error}`, rd: false });
  }
};
//delete a task
export const deletetask = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.params.id });
    let userId = await getuserId(req.headers.authorization);
    if (task && userId) {
      let user = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $pullAll: { tasklist: [task._id] } }
      );
      let del = await TaskModel.deleteOne({ _id: task._id });
      res
        .status(200)
        .json({ message: "task delete sucessfuly", del, rd: true });
    } else {
      res.status(202).json({ message: "task id is invalide", rd: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `internal sever error ${error}`, rd: false });
  }
};
//edit task
export const edittask = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.body._id });
    if (task) {
      task.taskname = req.body.taskname;
      task.discription = req.body.discription;
      task.details = req.body.details;
      task.taskcompletion = req.body.taskcompletion;
      task.startingdate = req.body.startingdate;
      task.endingdate = req.body.endingdate;
      await task.save();
      res
        .status(200)
        .json({ message: "Task Data update sucessfull", task, rd: true });
    } else {
      res.status(202).json({ message: "task id is invalide", rd: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `internal sever error ${error}`, rd: false });
  }
};

//task complete status
export const completestatus = async (req, res) => {
  try {
    const complete = await TaskModel.findOne({ _id: req.params.id });
    if (complete) {
      if (req.body.taskcompletion !== "") {
        complete.taskcompletion = req.body.taskcompletion;
        await complete.save();
        res
          .status(200)
          .json({ message: "Task complet Status add", complete, rd: true });
      } else {
        res.status(202).json({ message: "task data invalide", rd: false });
      }
    } else {
      res.status(202).json({ message: "task id is invalide", rd: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `internal sever error ${error}`, rd: false });
  }
};
