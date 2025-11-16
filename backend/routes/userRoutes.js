import express from "express";
import { createUser, getAllUsers, getUser, loginUser } from "../controllers/userController.js";

const userRoutes = express.Router();  //is used to create a mini-router in Express...

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/me", getUser);
userRoutes.get("/all-users", getAllUsers); 

export default userRoutes;