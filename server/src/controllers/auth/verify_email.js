import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js"
import usermodel from "../../models/user.model.js"
import ApiError from "../../middleware/Error/Error_handler/ApiError.js"
const verify_email =asyncHandler(
    async(req, res,next)=>{
const id = req.params.id;

const isuser = await usermodel.findById(id);

if(!isuser) return next (new ApiError(404,"user not found"))

    const update = await usermodel.findByIdAndUpdate(id,{$set:{isverify:true}})

    if(!update) return next(new ApiError(400,"Account not verified."))

res.status(201).json({
    message:"user verified successfully",
    success:true
})


    }
)

export default verify_email


