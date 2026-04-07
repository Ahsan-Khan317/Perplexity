import express from "express"
import authRouter from "./routes/auth.js"

import Error_middleware from "./middleware/Error/error.middleware.js"


const app = express()




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/perplexity/auth",authRouter)




app.use(Error_middleware)
export default app