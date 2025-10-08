import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required: true, unique: true},
    username: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    phone_number: {type: String, required: true, unique: true},
    isVerified: {type:Boolean, default:false},
    verificationToken: {type:String},
},{
    timestamps:true
});