// models/Users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  role: { type: Number, required: false }, // 1-> admin -> 2
  username: { type: String, required: true },
  password: { type: String, required: true },
  department: {type: Number, required:false},
  theme: { type: Boolean, required: false },
  status: { type: Boolean, enum: [1, 0], default: 1, required: true },
  trash: { type: String, enum: ["YES", "NO"], default: "NO", required: true },
  isVerified: { type: Boolean, enum:[1,0], default:0, required:true },
  verificationToken: { type: String },
  isLogin: {type:Boolean, enum:[1,0], default:1, required:true}
}, {
  timestamps: true,
});
// isLogin, isVerified, status
const User = mongoose.model("User", UserSchema);
export default User;
