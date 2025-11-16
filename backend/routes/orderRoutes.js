import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/create-order", createOrder);
orderRoutes.get("/get-orders", getOrders);

export default orderRoutes;