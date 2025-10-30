import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const BuildingSchema = mongoose.Schema({
    college_id:{type:String,required:true},
    location_id:{type:String, required:true},
    building:{type:String, required:true}
},{
    timestamps:true,
});

BuildingSchema.plugin(MongooseDelete,{deletedAt:true, overrideMethods:'all'});
export default mongoose.model('Building', BuildingSchema);