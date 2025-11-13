import bcrypt from "bcryptjs";
import crypto from 'crypto';
import {sendMail} from "../utils/sendMail.js";
import User from '../models/Users.js';
import { log } from "console";


const SubmitUser = async (req, res) => {
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    const { name, email, username, password, mobile, role, department } = req.body;

    const user_password = password ? password : username + '@12345';
    
    const final_password = user_password;

    if (!email || !username || !mobile) {
      req.flash('error', 'Please enter all fields');
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const existingEmail = await User.findOne({ email });
    
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

    await sendMail(
      email,
      "Welcome to NK College Management",
      null,
      "NK College Management",
      username
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

const storeStaffUser = async (req, res) => {
  try {    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const { staff_name, email, username, password, mobile, user_role, department, location, college, dob } = req.body;
    
    

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
      dob,
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

const editStaffUser = async (req, res) => {
  try{
    const userData = await User.findById(req.params.id);
    return res.status(200).json({userData});
  }catch(err){
    return res.status(500).json({err});
  }

}

const updateStaffUser = async (req, res) => {
  try {    
    const {_id, staff_name, email, username, password, mobile, user_role, department, location, college, dob } = req.body;
    
    const user_password = password ? password : username + '@12345';
    
    const final_password = user_password;

    if (!email || !staff_name || !mobile || !user_role || !department || !username || !location || !college || !dob) {
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const hashPassword = await bcrypt.hash(final_password, 10);

    await User.findByIdAndUpdate(_id, {
      name: staff_name,
      email,
      username,
      password: hashPassword,
      mobile,
      role: user_role,
      location_id: location,
      college_id: college,
      department_id: department,
      dob,
    });

    return res.status(200).json({message:"User Updated Successfully"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

const deleteStaffUser = async (req, res) => {
  try{
    const {id} = req.params;
    await User.delete({_id: id});
    res.status(200).json({message:"Staff Deleted Successfully"});
  }catch(err){
      res.status(500).json({message:err.message});
  }
}




const getStudentUser = async (req,res) =>{
  try{
    const role =[5];
    const studentData = await User.find({role:{$in:role}});
    
    
    return res.status(200).json({studentData});
  }catch(err){
    return res.status(500).json({message: err.message});
  }

}

const storeStudentUser = async (req, res) => {
  try {    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const { student_name, email, username, password, mobile, user_role, department, location, college, dob } = req.body;
    console.log(req.body);
    

    const user_password = password ? password : username + '@12345';
    
    const final_password = user_password;

    if (!email || !student_name || !mobile || !user_role || !department || !username || !location || !college || !dob) {
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
      name:student_name,
      email,
      username,
      password: hashPassword,
      mobile,
      role:user_role,
      location_id:location,
      college_id:college,
      department_id:department,
      dob,
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

const editStudentUser = async (req, res) => {
  try{
    const userData = await User.findById(req.params.id);
    return res.status(200).json({userData});
  }catch(err){
    return res.status(500).json({err});
  }

}

const updateStudentUser = async (req, res) => {
  try {    
    const {_id, student_name, email, username, password, mobile, user_role, department, location, college, dob } = req.body;
    
    const user_password = password ? password : username + '@12345';
    
    const final_password = user_password;

    if (!email || !student_name || !mobile || !user_role || !department || !username || !location || !college || !dob) {
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const hashPassword = await bcrypt.hash(final_password, 10);

    await User.findByIdAndUpdate(_id, {
      name: student_name,
      email,
      username,
      password: hashPassword,
      mobile,
      role: user_role,
      location_id: location,
      college_id: college,
      department_id: department,
      dob,
    });

    return res.status(200).json({message:"User Updated Successfully"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

const deleteStudentUser = async (req, res) => {
  try{
    const {id} = req.params;
    await User.delete({_id: id});
    res.status(200).json({message:"Staff Deleted Successfully"});
  }catch(err){
      res.status(500).json({message:err.message});
  }
}

export const registerUser = {
  SubmitUser, getStaffUser, storeStaffUser, editStaffUser, updateStaffUser, deleteStaffUser, getStudentUser,
  storeStudentUser, editStudentUser, updateStudentUser, deleteStudentUser
};