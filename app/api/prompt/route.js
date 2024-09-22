import Prompt from "@models/prompt";
import { connectMongoDB } from "@utils/database";




export const GET = async(request)=>{

    try{
       await connectMongoDB();
        const response = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(response),{status:200});
    }

catch(error){
    return new Response("Prompt not found",{status:403});

}


}