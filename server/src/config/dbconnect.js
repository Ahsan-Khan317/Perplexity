import mongoose from "mongoose";

const dbconnect = async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("server is connected to mongoDB successfully")
    })
}

export default dbconnect