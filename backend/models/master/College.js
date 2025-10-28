import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const CollegeSchema = mongoose.Schema({
    college:{type:String,required:true},
    location_id:{type:String, required:true}
},{
    timestamps:true,
});

CollegeSchema.plugin(MongooseDelete,{deletedAt:true, overrideMethods:'all'});
export default mongoose.model('College', CollegeSchema);