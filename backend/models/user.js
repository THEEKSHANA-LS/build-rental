import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName : {
            type : String,
            required : true,
        },
        nic : {
            type : String,
            required : true,
            unique : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            reuqired : true,
        },
        role : {
            type : String,
            required : true,
            default : "user",
        },
        isBlocked : {
            type : Boolean,
            default : false,
        },
        isEmailVerified : {
            type : Boolean,
            default : false,
        },
        createdAt : {
            type : Date,
            default : Date.now,
        },
        image : {
            type : String,
            default : "https://avatar.iran.liara.run/public/45"
        }
    }
)

const User = mongoose.model("User", userSchema); //connect database collection and backend using mongoose model...

export default User;