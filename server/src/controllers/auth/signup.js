import userModel from "../../models/user.model.js";
import ApiError from "../../middleware/Error/Error_handler/ApiError.js";
import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js";

const signup = asyncHandler(
    async(req,res,next)=>{
const {username,email,password} = req.body

const isUser =await userModel.findOne({email})

if (isUser) return next(new ApiError(404,"user Already exist"))

    const createUser = await userModel.create({
        username,email,password
    })

    res.status(201).json({
        createUser,
        message:"signup successfull",
        success:true
    })


    }
)

export default signup