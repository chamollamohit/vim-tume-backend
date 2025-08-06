import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
    
const uploadOnCloudinary = async(localFilePath) => {
    try {        
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: "auto"
            }
        )
        console.log("File uploaded on CLoudinary");
        fs.unlinkSync(localFilePath) // Deleteing file once uploaded on cloudinary
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // Deleteing file if unable to uploaded on cloudinary
        return null
    }
}

const delteFromCloudinary = async(publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("Error in deleting from cloudinary");
        return null
    }
}


export {uploadOnCloudinary, delteFromCloudinary}