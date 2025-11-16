import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//sign-up function...
export function createUser(req, res){
   
   const hashedPassword = bcrypt.hashSync(req.body.password, 10);

   const user = new User(
    {
       fullName : req.body.fullName,
       nic : req.body.nic,
       email : req.body.email,
       password : hashedPassword,
    }
   )

   user.save().then(
    () => {
        res.status(200).json({
            message : "User created successfully."
        })
    }
   ).catch(
    () => {
        res.status(500).json({
            message : "Failed to create user."
        })
    }
   )
};

//login function...
export function loginUser(req, res){
   User.findOne(
    {
        email : req.body.email
    }
   ).then(
    (user) => {
        if(user == null){
            res.status(404).json(
                {
                    message : "User not found"
                }
            )
        } else{
            if(user.isBlocked){
                res.status(403).json({
                    message : "Your account has been blocked. Please conatact admin."
                });
                return;
            }
            const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password);
            if(isPasswordMatching){
                const token = jwt.sign(
                    {
                        email : user.email,
                        fullName : user.fullName,
                        role : user.role,
                        nic : user.nic,
                        isEmailVerfied : user.isEmailVerified,
                        image : user.image
                    },
                    process.env.JWT_SECRET
                )

                res.json(
                    {
                        message : "Login successful",
                        token : token,
                        user : {
                            email : user.email,
                            fullName : user.fullName,
                            role : user.role,
                            nic : user.nic,
                            isEmailVerified : user.isEmailVerified
                        }
                    }
                )
            } else {
                res.status(401).json(
                    {
                        message : "Invaild password"
                    }
                )
            }
        }
    }
   )
};

//Authorization part...
export function isAdmin(req){
  if(req.user == null){
    return false;
  }

  if(req.user.role != "admin"){
    return false;
  }

  return true;
};

//get user details...
export function getUser(req, res){
  if(req.user == null){
    res.status(401).json({
        message : "Unauthorized."
    })
    return;
  } else{
    res.json(
        req.user
    )
  }
};

//get all user details...
export async function getAllUsers(req, res){
  if(!isAdmin(req)){
    res.status(403).json({
        message : "Access denied. Admins only."
    });
    return;
  }
  try {
    const users = await User.find();
    res.json(users);   
  }catch(error){
    res.status(500).json({
        message : "Failed to get users."
    })
  }
};


