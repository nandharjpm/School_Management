// models/Users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  role: { type: Number, required: false },
  user_type: { type: Number, required: false },
  is_staff: { type: Boolean, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  class_section: { type: String, required: false },
  mobile: { type: Number, required: true },
  theme: { type: Boolean, required: false },
  status: { type: Boolean, enum: [1, 0], default: 1, required: true },
  trash: { type: String, enum: ["YES", "NO"], default: "NO", required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
}, {
  timestamps: true,
});

const User = mongoose.model("Register", UserSchema);
export default User;
