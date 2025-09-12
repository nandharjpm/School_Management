import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connection made for DB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology: true})
        .then(()=>console.log("DB Connected Successfully"))
        .catch((err)=>console.error("something went wrong", err));


