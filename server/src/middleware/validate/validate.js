import { validationResult } from "express-validator";
import ApiError from "../Error/Error_handler/ApiError.js";

const validate = (req,res,next)=>{
const err = validationResult(req);
if(!err.isEmpty()) return next(new ApiError(400,err.array().map(e=>e.msg).join(" , ")))
next()

}

export default validate