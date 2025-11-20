import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const anouncementSchema = mongoose.Schema({
    anouncement:{type:String, required:true},
    anouncement_image:{type:String, required:true}
},{
    timestamps:true,
});
anouncementSchema.plugin(mongooseDelete, {deletedAt: true, overrideMethods:'all'});
export default mongoose.model('Anouncement', locationSchema);