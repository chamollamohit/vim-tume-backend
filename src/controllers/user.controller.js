import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, delteFromCloudinary } from "../utils/cloudinary.js";

const resgisterUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body

    // Validation
    if (
        [fullname, email, username, password].some((field) => field?.trim() === '')
    ) {
        throw new ApiError(400, "All field are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (existedUser) {
        throw new ApiError(409, "User already existed with username or email")
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    let avatar
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)

    } catch (error) {
        console.log("Error uploading avatar", error);
        throw new ApiError(500, "Failed to upload Avatar file")
    }

    let coverImage
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath)

    } catch (error) {
        console.log("Error uploading coverimage", error);
        throw new ApiError(500, "Failed to upload coverimage file")
    }

try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverimage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering user")
        }
    
        return res
            .status(201)
            .json(new ApiResponse(200, createdUser, "User registered"))
} catch (error) {
    console.log("User creation falied");

    if (avatar) {
        await delteFromCloudinary(avatar.public_id)
    }
    
    if (coverImage) {
        await delteFromCloudinary(coverImage.public_id)
    }
    throw new ApiError(500, "Something went wrong while registering use and images were deleted")
}
})


export { resgisterUser }