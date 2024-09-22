import mongoose from "mongoose";

let isConnected = false;    //track the connection

    
export const connectMongoDB = async()=>{


    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("MongoDB already Connected");
    }

    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    }
    catch(error){
        console.log(error)
    }


}
