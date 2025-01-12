import mongoose, { Error } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
if(!process.env.MONGO_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectdb(){
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
        });
        console.log("database connected");
    } catch (error) {
        console.log("mongodb connection error",error);
        process.exit(1);
    }
}

export default connectdb 
