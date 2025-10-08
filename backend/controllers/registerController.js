import bcrypt from "bcryptjs";
import newUser from "../models/Register.js";
import Register from "../models/Register.js";

export const registerUser = async(req, res)=>{
    try{
        console.log(req.body);
        const {username, password, phone_number} = req.body;

        if(!username || !password || !phone_number){
            return res.status(400).json({mesage:"Please Enter All Fields"});
        }

        const existingUser = await newUser.findOne({email: username});
        const exitsingPhoneNum = await newUser.findOne({phone_number});

        if(existingUser || exitsingPhoneNum){
            return res.status(400).json({message:"Email or Phone Number is alredy Exist"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = new Register({
           email: username,
            password:hashPassword,
            phone_number,
        });

        await createUser.save();
        return res.status(201).json({message:"User Created Successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}