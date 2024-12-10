import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";


const DBConnection = asyncHandler(async(req,res)=>{
    try {
        const connection= await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`DB connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(`DB Connection failed: ${error.message}`)
    }
})


export default DBConnection