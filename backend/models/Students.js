import mongoose from "mongoose";

mongoose.Schema({
    __id:Number,
    name:{type:String, required: true},
    id_card:{type:String, required: true},
})