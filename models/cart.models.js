import mongoose, { mongo } from "mongoose";


const cartItemSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    size:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
        required:true
    }
})

const cartSchema= new mongoose.Schema({
    items:{
        type:[cartItemSchema]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})

const Cart = new mongoose.model("Cart",cartSchema)

export default Cart