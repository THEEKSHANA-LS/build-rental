import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
       tool : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tool",
        required : true,
       },
       quantity : {
        type : Number,
        required : true,
       },
       pricePerDay : {
        type : Number,
        reuqired : true,
       }
    }
);

const orderSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        items : [orderItemSchema],
        rentalStart : {
            type : Date,
            required : true,
        },
        rentalEnd : {
            type : Date,
            reuiqred : true,
        },
        totalAmount : {
            type : Number,
            reuqired : true,
        },
        status : {
            type : String,
            enum : ["Pending", "Ongoing", "Completed", "Cancelled"],
            default : "Pending",
        },
        createdAt : {
            type : Date,
            default : Date.now,
        },
        paymentStatus : {
            type : String,
            enum : ["Unpaid", "Paid", "refunded"],
            default : "Unpaid",
        }
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;