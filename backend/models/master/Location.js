import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const locationSchema = mongoose.Schema({
    location:{type:String, required:true}
},{
    timestamps:true,
});
locationSchema.plugin(mongooseDelete, {deletedAt: true, overrideMethods:'all'});
export default mongoose.model('Location', locationSchema);