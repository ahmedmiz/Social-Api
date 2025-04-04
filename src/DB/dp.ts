import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_uri: string = process.env.DB_uri || '';  
const connectDB = async () => { 
    const connection = await mongoose.connect(DB_uri).then(() => console.log("connection to database established")).catch((err) => console.log(err));
    return connection; 
}

export default connectDB;

