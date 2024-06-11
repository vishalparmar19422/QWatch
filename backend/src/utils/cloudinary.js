import { v2 as cloudinary } from "cloudinary"
import fs from " fs"


cloudinary.config({
    cloud_name: "qtube",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null
        const res = await cloudinary.uploader.upload(filePath, { resource_type: "auto" })
        console.log("file uploaded on cloudinary successfully");
        return res;
    } catch (error) {
        fs.unlinkSync(filePath)
        return null;
    }
}


export default uploadOnCloudinary;