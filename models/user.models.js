import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum: ["admin","user"]
    },
    address:{
        addressline1:{
            type:String,
            required:true
        },
        addressline2:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            required:true,
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true
        }
    }
}, { timestamps: true });

const User = new mongoose.model("User", userSchema);

export default User;
