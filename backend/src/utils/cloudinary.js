import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()



cloudinary.config({
    cloud_name: "backendfiles",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})


const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null
        console.log(filePath, "cloud")
        const res = await cloudinary.uploader
            .upload(filePath, { resource_type: "auto" })
        console.log("file uploaded on cloudinary successfully");
        fs.unlinkSync(filePath)
        return res;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(filePath)
        return null;
    }
}


export default uploadOnCloudinary;