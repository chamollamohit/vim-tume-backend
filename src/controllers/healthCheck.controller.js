import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

const healthCheck = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json( new ApiResponse (200, "ok", "Health check is passed"))
} )


export { healthCheck }