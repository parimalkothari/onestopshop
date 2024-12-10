import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import User from '../models/user.models.js'

const verifyJWT=asyncHandler(async(req,res,next)=>{
    const accessToken= req.cookies.accessToken
    if(!accessToken){
        throw new ApiError(403,"Unauthorized request")
    }
    const loggedInUser= jwt.decode(accessToken)
    const user= await User.findById(loggedInUser._id)
    if(!user){
        throw new ApiError(403,"Unauthorized request")
    }
    req.user=user
    next()
})

export default verifyJWT