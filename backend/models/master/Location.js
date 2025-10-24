import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    location:{type:String, required:true}
},{
    timestamps:true,
});
export default mongoose.model('Location', locationSchema);