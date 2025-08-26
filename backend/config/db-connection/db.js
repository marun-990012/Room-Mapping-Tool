import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
       const uri = process.env.DB_URI;
        // console.log(uri);
        if (!uri) {
         throw new Error("Database URI is not defined in environment variables");
        }
       await mongoose.connect(uri);
       console.log('connected to database');
    } catch (error) {
        console.log('error while connecting to database');
    }
}

export default connectDB;