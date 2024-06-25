

import asyncHandler from "../utils/asyncHandled.js";
import { User } from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const registerUser = async (req, res) => {

    const { fullname, username, password, email } = req.body;

    if (
        [fullname, username, password, email].some((field) => {
            return field?.trim() === ""
        })
    ) {
        return res.status(400).json({ message: "Fields can't be empty " });

    }
    else if (!email.includes("@gmail.com")) {
        return res.status(400).json({ message: "incorrect email" });


    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this username or email " });

    }

    const avatarLocal = req.files?.avatar[0].path;
    //const coverLocal =  req.files?.coverImage[0]?.path || "";

    let coverLocal;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverLocal = req.files?.coverImage[0]?.path
    }

    if (!avatarLocal) {
        return res.status(400).json({ message: "avatar is required" });
    }

    const avatarUrl = await uploadOnCloudinary(avatarLocal)
    const coverUrl = await uploadOnCloudinary(coverLocal)



    if (!avatarUrl) {
        return res.status(500).json({ message: "Error uploading avatar" });
    }
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        password,
        email,
        avatar: avatarUrl.url,
        coverImage: coverUrl?.url || "",



    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw Error("error while regestring user ")

    }

    return res.json({ createdUser }).status(200)


}


export { registerUser };