import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tasklist:{
        type:Array,
        required:false
    }
});
export const UserModel = mongoose.model('users', userSchema);
export default UserModel;