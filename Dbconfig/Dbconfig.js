import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL=process.env.DBURL

const connectDB=async()=>{
    try {
        let connectionurl=await mongoose.connect(URL);
          console.log("Connected to the MongoDB");
          return connectionurl
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;