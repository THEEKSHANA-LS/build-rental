import Order from "../models/order.js";
import Tool from "../models/tool.js";
import { isAdmin } from "./userController.js";

// ======================================================
// CREATE ORDER CONTROLLER
// ======================================================
export async function createOrder(req, res) {
  try {
    const {
      customerName,
      email,
      nic,
      phone,
      address,
      rentalStart,
      rentalEnd,
      items
    } = req.body;

    // --------------------------------------
    // 1. Validate Required Fields
    // --------------------------------------
    if (!customerName || !email || !nic || !phone || !address) {
      return res.status(400).json({
        message: "Customer name, email, NIC, phone and address are required"
      });
    }

    if (!rentalStart || !rentalEnd) {
      return res.status(400).json({
        message: "Rental start and end dates are required"
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items array is required and cannot be empty"
      });
    }

    // Validate date order
    if (new Date(rentalStart) >= new Date(rentalEnd)) {
      return res.status(400).json({
        message: "Rental end date must be later than rental start date"
      });
    }

    // --------------------------------------
    // 2. Generate Unique Order ID
    // --------------------------------------
    const lastOrder = await Order.find().sort({ createdAt: -1 }).limit(1);
    let newOrderId = "BR0001";

    if (lastOrder.length > 0) {
      const lastId = lastOrder[0].orderId;
      const lastNumber = parseInt(lastId.replace("BR", "")) + 1;
      newOrderId = "BR" + lastNumber.toString().padStart(4, "0");
    }

    // --------------------------------------
    // 3. Validate Tools + Calculate Total Amount
    // --------------------------------------
    let totalAmount = 0;
    const validatedItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check tool exists
      const tool = await Tool.findOne({ toolId: item.toolId });

      if (!tool) {
        return res.status(404).json({
          message: `Tool with ID ${item.toolId} not found`,
          toolId: item.toolId
        });
      }

      // Quantity check (optional)
      if (item.quantity <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for toolId ${item.toolId}`
        });
      }

      // Daily cost * quantity * number of days
      const days =
        (new Date(rentalEnd) - new Date(rentalStart)) / (1000 * 60 * 60 * 24);

      const itemCost = tool.pricePerDay * item.quantity * days;
      totalAmount += itemCost;

      validatedItems.push({
        toolId: tool.toolId,
        quantity: item.quantity,
        pricePerDay: tool.pricePerDay,
        image: tool.image
      });
    }

    // --------------------------------------
    // 4. Create Order
    // --------------------------------------
    const newOrder = new Order({
      orderId: newOrderId,
      customerName,
      email : req.body.email,
      nic : req.body.nic,
      phone,
      address,
      rentalStart,
      rentalEnd,
      items: validatedItems,
      totalAmount,
      paymentStatus: "Unpaid",
      status: "Pending"
    });

    const savedOrder = await newOrder.save();

    // --------------------------------------
    // 5. Reduce Tool Stock (Optional but Recommended)
    // --------------------------------------
    
    for (const item of validatedItems) {
      await Tool.updateOne(
        { toolId: item.toolId },
        { $inc: { stock: -item.quantity } }
      );
    }


    return res.status(201).json({
      message: "Order created successfully",
      order: savedOrder
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

export function isCustomer(req) {
    return req.user && req.user.role === "user";
};
  
//this api end point used for admin and customer view products...
export async function getOrders(req, res){
  if(isAdmin(req)){
    const orders = await Order.find().sort({date: -1})
    res.json(orders);
  } else if(isCustomer(req)){
    const user = req.user;
    const orders = await Order.find({email : user.email}).sort({date : -1})
    res.json(orders);
  } else {
    res.status(403).json({
        message : "Access denied. Authorized users only can view orders."
    })
  }
}

//for update order status by admin...
export async function updateOrderStatus(req, res){
   if(!isAdmin(req)){
    res.status(403).json({
      message : "Access denied. You are not authorized to update order status."
    })
    return;
   }
   const orderId = req.params.orderId;
   const newStatus = req.body.status;

   try{
    await Order.updateOne(
      {orderId : orderId},
      {status : newStatus}
    )

    res.json(
      {
        message : "Order status updated successfully"
      }
    );

   } catch(error){
    console.error(error)
    res.staus(500).json({
      message : "Failed to update order status"
    })
    return;
   }
};

