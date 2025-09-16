import mongoose from "mongoose";

const StaffSchema = mongoose.Schema({
    _id:Number,
    name:{type:String, required:true},
    id_card:{type:String, required: true},
    class_section:{type:String, required: true},
    mobile:{type:Number, required: true},
    status:{type:Boolean, enum:[1,0], default:1, required:true},
    trash:{type:String, enum:["YES","NO"], default:"NO", required:true}
},{
    timestamps:true,
});
export default mongoose.model("staffs", StaffSchema)