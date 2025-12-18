import express from "express";
import { createTool, deleteTool, getToolById, getTools, updateTool } from "../controllers/toolController.js";

const toolRoutes = express.Router();  //is used to create a mini-router in Express...

toolRoutes.post("/create-tool", createTool);
toolRoutes.get("/get-tools", getTools);
toolRoutes.get("/:toolId", getToolById);

//admin only routes...
toolRoutes.delete("/:toolId", deleteTool);
toolRoutes.put("/:toolId", updateTool);

export default toolRoutes;