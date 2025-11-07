import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const authenticationController = async(req, res) => {
    try{
        const {username, password} = req.body;
        console.log("Login attempt:", req.body);
        
        if(!username || !password){
            req.flash('error', 'Username or Password is Missing');
            return res.status(401).json({message:"Please Enter User Name and Password"});
        }
        
        const getUsername = await User.findOne({username});
        console.log(getUsername);
        
        if(!getUsername){
            return res.status(400).json({message:"User Not Found"});
        }

        if(!getUsername.isVerified){
            return res.status(403).json({message:"Verify Your Account First"});
        }

        console.log("Password from DB:", getUsername.password);
        const isValid = await bcrypt.compare(password, getUsername.password);
        if(!isValid){
            req.flash('error', 'Invalid User Name or Password');
            return res.status(401).json({message:"Invalid Username"});
        }
        
        const token = jwt.sign({id:getUsername._id, username:getUsername.username}, process.env.SESSION_KEY, {expiresIn: "2h"});
        
        return res.status(200).json({token, user:{id:getUsername._id, username:getUsername.username}});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}