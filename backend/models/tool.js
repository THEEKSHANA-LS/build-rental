import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
    {
        toolId : {
            type : String,
            required : true,
            unique : true,
        },
        name : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        category : {
            type : String,
        },
        images : {
            type : [String],
            default : [],
            required : true,
        },
        pricePerDay : {
            type : Number,
            required : true,
        },
        quantity : {
            type : Number,
            required : true,
            default : 0,
        },
        condition : {
            type : String,
            enum : ['new','good','fair','poor'], 
            default : 'good',
        },
        active : {
            type : Boolean,
            default : true,
        },
        createdAt : {
            type : Date,
            default : Date.now,
        },
    }
)

const Tool = mongoose.model("Tool", toolSchema); //connect database collection and backend using mongoose model...

export default Tool;