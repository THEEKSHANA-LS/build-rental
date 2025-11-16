import mongoose from "mongoose";

// =========================
// Order Item Sub-Schema
// =========================
const orderItemSchema = new mongoose.Schema({
    /*tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool",
        required: true,
    },*/
    toolId : {
        type : String,
        required :true
    },
    quantity: {
        type: Number,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
    image: {
        type: [String],
        default : [],
        required: true,
    }
});

// =========================
// Main Order Schema
// =========================
const orderSchema = new mongoose.Schema({
    // ---------- USER DETAILS ----------
    /*userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },*/
    orderId : {
        type : String,
        required : true
    },
    customerName : {
        type : String,
        required : true
    },
    nic: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

    // ---------- ORDER ITEMS ----------
    items: {
        type: [orderItemSchema],
        required: true,
    },

    // ---------- RENTAL DURATION ----------
    rentalStart: {
        type: Date,
        required: true,
    },
    rentalEnd: {
        type: Date,
        required: true,
    },

    // ---------- PAYMENT ----------
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Unpaid", "Paid", "Refunded"],
        default: "Unpaid",
    },

    // ---------- ORDER STATUS ----------
    status: {
        type: String,
        enum: ["Pending", "Ongoing", "Completed", "Cancelled"],
        default: "Pending",
    },

    // ---------- METADATA ----------
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
