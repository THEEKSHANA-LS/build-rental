import express from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/create-order", createOrder);
orderRoutes.get("/get-orders", getOrders);
orderRoutes.put("/update-order-status/:orderId", updateOrderStatus);

export default orderRoutes;