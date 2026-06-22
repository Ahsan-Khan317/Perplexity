import asyncHandler from "../../shared/middleware/asyncHandler.js"
import ApiResponse from "../../shared/utils/apiResponse.js"
import final from "./graph.js"


const ai_battle_arena = asyncHandler(
    async(req,resizeBy,next)=>{
const {question} = req.body


        const result = await final.invoke({question})
        resizeBy.send(new ApiResponse(200,"answer fetched successfully", result))



    }
)

export default ai_battle_arena