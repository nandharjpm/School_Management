import mongoose from "mongoose"
import MongooseDelete from "mongoose-delete"

const CourseSchema = mongoose.Schema({
    location_id:{type:String, required:true},
    college_id:{type:String, required:true},
    department_id:{type:String, required:true},
    year:{type:String, required:true},
    course:{type:[String], required:true}
},{
    timestamps:true,
});

CourseSchema.plugin(MongooseDelete,{deletedAt:true, overrideMethods:'all'});
export default mongoose.model('Course', CourseSchema);