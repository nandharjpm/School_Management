import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "../backend/routes/web.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connection made for DB
mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("DB Connected Successfully"))
        .catch((err)=>console.error("something went wrong", err));

app.use('/api', registerRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
