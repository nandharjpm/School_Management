import bcrypt from "bcryptjs";
import crypto from 'crypto';
import {sendMail} from "../utils/sendMail.js";
import User from '../models/Users.js';


const SubmitUser = async (req, res) => {
  try {
    console.log("registerUser() called with body:", req.body); 
    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    const { name, email, username, password, mobile, role, department } = req.body;

    const user_password = password ? password : username + '@12345';
    
    const final_password = user_password;

    if (!email || !username || !mobile) {
      req.flash('error', 'Please enter all fields');
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const existingEmail = await User.findOne({ email });
    console.log(existingEmail);
    
    if (existingEmail) {
      req.flash('error', 'Email is already exist');
      return res.status(400).json({ message: "Email is already exist" });
    }

    const existingusers = await User.findOne({ username });
    if (existingusers) {
      req.flash('error', 'username is already exist');
      return res.status(400).json({ message: "username is already exist" });
    }
    
    const existingPhoneNum = await User.findOne({ mobile });
    if (existingPhoneNum) {
      req.flash('error', 'Phone Number is already exist');
      return res.status(400).json({ message: "Phone Number is already exist" });
    }

    
    const hashPassword = await bcrypt.hash(final_password, 10);

    const createusers = new User({
      name,
      email,
      username,
      password: hashPassword,
      mobile,
      role,
      department,
      verificationToken
    });
    await createusers.save();


    const verificationUrl = `${process.env.BACKEND_URL}api/verify-email?token=${verificationToken}`;
    res.status(201).json({ message: "User Created Successfully" });
    await sendMail(
      email,
      "Verify your account",
      `<p>Hi ${username},</p>
       <p>Click the link below to verify your account:</p>
       <a href="${verificationUrl}">Verify its You</a>`
    );
    console.log("previous email is called");

    await sendMail(
      email,
      "Welcome to NK College Management",
      null,
      "NK College Management",
      username
    );
    console.log("Ai Mail Called")
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const storeStaffUser = async (req, res) => {
  try {    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const { staff_name, email, username, password, mobile, user_role, department, location, college, dob } = req.body;
    console.log(req.body);
    
    

    const user_password = password ? password : username + '@12345';
    
    const final_password = user_password;

    if (!email || !staff_name || !mobile || !user_role || !department || !username || !location || !college || !dob) {
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const existingEmail = await User.findOne({ email });
    
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already exist" });
    }

    const existingusers = await User.findOne({ username });
    if (existingusers) {
      return res.status(400).json({ message: "username is already exist" });
    }
    
    const existingPhoneNum = await User.findOne({ mobile });
    if (existingPhoneNum) {
      return res.status(400).json({ message: "Phone Number is already exist" });
    }

    
    const hashPassword = await bcrypt.hash(final_password, 10);

    const createusers = new User({
      name:staff_name,
      email,
      username,
      password: hashPassword,
      mobile,
      role:user_role,
      location_id:location,
      college_id:college,
      department_id:department,
      verificationToken
    });
    await createusers.save();


    const verificationUrl = `${process.env.BACKEND_URL}api/verify-email?token=${verificationToken}`;
    res.status(201).json({ message: "User Created Successfully" });
    await sendMail(
      email,
      "Verify your account",
      `<p>Hi ${username},</p>
       <p>Click the link below to verify your account:</p>
       <a href="${verificationUrl}">Verify its You</a>`
    );
    await sendMail(
      email,
      "Welcome to NK College Management",
      null,
      "NK College Management",
      username,
      user_role
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const getStaffUser = async (req,res) =>{
  try{
    const role =[2,3,4];
    const staffData = await User.find({role:{$in:role}});
    
    return res.status(200).json({staffData});
  }catch(err){
    return res.status(500).json({message: err.message});
  }

}

export const registerUser = {
  SubmitUser, getStaffUser, storeStaffUser
};