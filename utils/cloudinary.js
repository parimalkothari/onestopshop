import { v2 as cloudinary } from 'cloudinary';
import asyncHandler from './asyncHandler.js'
import fs from 'fs'

const uploadOnCloudinary =async(localFilePath)=>{
    cloudinary.config({
        cloud_name: process.env.ClOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        if(!localFilePath){
            return null;
        }
        const uploadInstance= await cloudinary.uploader.upload(localFilePath,{resource_type:auto})
        fs.unlinkSync(localFilePath)
        return uploadInstance        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(`cloudinary upload failed: ${error.message}`)
    }
}

const deleteFromCloudinary = async(uploadedUrl)=>{
    cloudinary.config({
        cloud_name: process.env.ClOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        if(!uploadedUrl){return null}
        const publicId=uploadedUrl.split('/').pop().split('.')[0]
        const result= await cloudinary.uploader.destroy(publicId)
        return result

    } catch (error) {
        console.log(`delete from cloudinary failed: ${error.message}`)
    }
}


export {uploadOnCloudinary,deleteFromCloudinary}