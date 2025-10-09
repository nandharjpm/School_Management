import bcrypt from "bcryptjs";
import crypto from 'crypto';
import {sendMail} from "../utils/sendMail.js";
import User  from '../models/Users.js';

const verificationToken = crypto.randomBytes(32).toString('hex');

export const registerUser = async (req, res) => {
  try {

    const { email, username, password, mobile } = req.body;
    if (!email || !username || !password || !mobile) {
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
    console.log(req.body);

    
    const hashPassword = await bcrypt.hash(password, 10);
    const createusers = new User({
      email,
      username,
      password: hashPassword,
      mobile,
      verificationToken
    });
    await createusers.save();


    const verificationUrl = `${process.env.BACKEND_URL}api/verify-email?token=${verificationToken}`;
    await sendMail(
      email,
      "Verify your account",
      `<p>Hi ${username},</p>
       <p>Click the link below to verify your account:</p>
       <a href="${verificationUrl}">Verify its You</a>`
    );

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
