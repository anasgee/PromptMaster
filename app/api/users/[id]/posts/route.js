import { connectMongoDB } from "@utils/database";
import Prompt from "@models/prompt";



export const GET = async(req,{params})=>{

    try{
        await connectMongoDB();                                                     
        const response = await Prompt.find({creator:params.id}).populate("creator");
        console.log(response);
     return new Response(JSON.stringify(response),{status:200});
   

    }
    catch(error){
        return new Response("There is an error, so prompt cannot be created",{status:404});
} 
}