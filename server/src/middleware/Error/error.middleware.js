
const Error_middleware = (err,req,res,next)=>{
res.status(err.statusCode || 500).json({
    message:err.message || "Internal Server Error",
    success:false
})



}

export default Error_middleware