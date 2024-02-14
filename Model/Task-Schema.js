import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true
    },
    discription:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    startingdate: {
        type: Date,
        required: true
    },
    taskcompletion:{
        type:Boolean,
        required:false,
        default:false
    },
    endingdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: false,
    }
});
export const TaskModel = mongoose.model('tasks', taskSchema);
export default TaskModel;
