import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    _id:Number,
    name:{type:String, required:true},
    email:{type:String, required: true},
    role:{type:Number, required:true},
    user_type:{type:Number, required: true},
    is_staff:{type:Boolean, required: true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    class_section:{type:String, required:true},
    mobile:{type:Number, required:true},
    theme:{type:Boolean, required:false},
    status:{type:Boolean, enum:[1,0], default:1, required:true},
    trash:{type:String, enum:["YES", "NO"], default:"NO", required:true},
},{
    timestamps:true,
});
export default mongoose.model("users", UserSchema);