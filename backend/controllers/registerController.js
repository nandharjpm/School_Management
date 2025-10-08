import bcrypt from "bcryptjs";
import newUser from "../models/Register.js";
import crypto from 'crypto';
import {sendMail} from "../utils/sendMail.js";

const verificationToken = crypto.randomBytes(32).toString('hex');

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { email, username, password, phone_number } = req.body;
    if (!email || !username || !password || !phone_number) {
      req.flash('error', 'Please enter all fields');
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const existingEmail = await newUser.findOne({ email });
    if (existingEmail) {
      req.flash('error', 'Email is already exist');
      return res.status(400).json({ message: "Email is already exist" });
    }

    const existingUser = await newUser.findOne({ username });
    if (existingUser) {
      req.flash('error', 'Username is already exist');
      return res.status(400).json({ message: "Username is already exist" });
    }
    
    const existingPhoneNum = await newUser.findOne({ phone_number });
    if (existingPhoneNum) {
      req.flash('error', 'Phone Number is already exist');
      return res.status(400).json({ message: "Phone Number is already exist" });
    }

    
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = new newUser({
      email,
      username,
      password: hashPassword,
      phone_number,
      verificationToken
    });
    await createUser.save();


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
