import mongoose from "mongoose"
import bcrypt from "bcrypt"
import sendEmail from "../services/Email/sendEmail.js"
import { verify_emailmsg } from "../services/Email/email_msg.js"
const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required for signup"],
        trim:true
    },

    email:{
        type:String,
        required:[true,"Email is required for signup"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required for signup"],
        select:false
    },
    isverify:{
        type:Boolean,
        default:false
    }
})

userschema.pre("save",async function(){
    if(!this.isModified("password")) return 
        this.password = await bcrypt.hash(this.password , 12)  
    

})

userschema.methods.comparePassword = async function (password) {
    const result =await  bcrypt.compare(password,this.password)
    return result
}
userschema.post("save", async function(doc) {
   
    const link =`https://perplexity-oepg.onrender.com/perplexity/auth/verify/email/${doc._id}`;
    try {
        await sendEmail(doc.email, "Verify Your Account", verify_emailmsg(link));
        console.log(`Email sent to ${doc.email}`);
    } catch (err) {
        console.error("Email sending failed:", err);
    }
});

const userModel = mongoose.model("users",userschema)

export default userModel



