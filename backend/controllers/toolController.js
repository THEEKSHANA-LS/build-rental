import { isAdmin } from "../controllers/userController.js";
import Tool from "../models/tool.js";

//Create tool function...
export async function createTool(req, res){
    
   //authorization part...
   if(!isAdmin(req)){
    res.status(403).json({
        message : "Access denied. You are not authorized to create tool."
    });
    return;
   }

   try{
    const toolData = req.body;
    const tool = new Tool(toolData);

    await tool.save();

    res.json({
        message : "Tool created successfully",
        tool : tool,
    });

   } catch(error){
    console.error(error);
    res.status(500).json({
        message : "Failed to create tool",
    });
   }
};

//get all tools function...
export async function getTools(req, res){
   try{
    const tools = await Tool.find();
    res.json(tools);

   } catch(error){
    console.error(error);
    res.status(500).json({
        message : "Failed to fetch tools",
    });
   }
};

//delete tool function...
export async function deleteTool(req, res){
    
    //authorization part...
    if(!isAdmin(req)){
      res.status(403).json({
        message : "Access denied. You are not authorized to delete tool."
      });
      return;
    }
     
    try{
        const toolId = req.params.toolId;

        await Tool.deleteOne({
            toolId : toolId
        });

        res.json({
            message : "Tool deleted successfully"
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to delete tool",
        });
    }
};

//update tool function...
export async function updateTool(req, res){
   
    //authorization part...
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access denied. You are not authorized to update tool."
        });
        return;
    }

    try{
        const toolId = req.params.toolId;
        const updateData = req.body;

        await Tool.updateOne(
            {toolId : toolId},
            updateData
        );

        res.json({
            message : "Tool updated successfully"
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to update tool",
        });
    }
};

//get specific tool by toolId function...
export async function getToolById(req, res){
   try{
    const toolId = req.params.toolId;

    const tool = await Tool.findOne({
        toolId : toolId
    })

    if(tool == null){
        res.status(404).json({
            message : "Tool not found",
        });
    } else {
        res.json(tool);
    }
   } catch(error){
    console.error(error);
    res.status(500).json({
        message : "Failed to fetch tool",
    });
   }
};

//search tools function...
export async function searchTools(req, res){

};

