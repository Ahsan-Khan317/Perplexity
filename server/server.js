import "./src/config/env.js"
import app from "./src/app.js";
import dbconnect from "./src/config/dbconnect.js";



app.listen(process.env.PORT,()=>{
    dbconnect()
    console.log("server started successfully")
})















