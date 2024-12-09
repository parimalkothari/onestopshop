import mongoose from "mongoose";

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Category,
        default:null
    }
},{timestamps:true})

const Category= new mongoose.model('Category',categorySchema)

export default Category