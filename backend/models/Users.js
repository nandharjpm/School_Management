// models/Users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  role: { type: Number, required: false }, // 1-> admin -> 2
  username: { type: String, required: true },
  password: { type: String, required: true },
  location_id:{type:String, required:false},
  college_id:{type:String, required:false},
  department_id: {type: String, required:false},
  dob: {type: String, required:false},
  theme: { type: Boolean, required: false },
  status: { type: Boolean, enum: [1, 0], default: 1, required: true },
  trash: { type: String, enum: ["YES", "NO"], default: "NO", required: true },
  isVerified: { type: Boolean, enum:[1,0], default:0, required:true },
  verificationToken: { type: String, required:false},
  isLogin: {type:Boolean, enum:[1,0], default:1, required:true}
}, {
  timestamps: true,
});
const Users= mongoose.model("users", UserSchema);

export default Users;
