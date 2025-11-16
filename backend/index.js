import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jwt from "jsonwebtoken";
import toolRoutes from "./routes/toolsRoutes.js";

const app = express(); 

app.use(express.json()); //middelware for parse JSON bodies...

app.use(cors()); //middleware for accept request from anywhere...

dotenv.config(); //use to connect data from .env...

//connect database...
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Databese connected successfully")
    }
).catch(
    ()=>{
        console.log("Databese connection failed")
    }
);

//middleware for dcrypt bearer token for use authorization...
app.use(
    (req, res, next) => {
        let token = req.header("Authorization")

        if(token != null){
           token = token.replace("Bearer ", "") //use for remove "Bearer" from this token...

           //dcrypt token...
           jwt.verify(token, process.env.JWT_SECRET,
            (error, decoded) => {
                if(decoded == null){
                    res.json({
                       message : "Invalid Token. Please Login again"
                    })
                    return;
                } else{
                    req.user = decoded; //add user details to the request...
                }
            }
           )
        }
        next() //if the token is correct, then pass the request to the correct destination...
    }
)

//start api routes...
app.use("/api/users", userRoutes);
app.use("/api/tools", toolRoutes);

//start express server...
app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});

