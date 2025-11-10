import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const DepartmentSchema = mongoose.Schema({
    college_id:{type:String,required:true},
    location_id:{type:String, required:true},
    department:{type:String, required:true}
},{
    timestamps:true,
});

DepartmentSchema.plugin(MongooseDelete,{deletedAt:true, overrideMethods:'all'});
export default mongoose.model('Department', DepartmentSchema);