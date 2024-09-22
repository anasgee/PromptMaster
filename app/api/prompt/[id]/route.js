import Prompt from "@models/prompt";
import { connectMongoDB } from "@utils/database";



const GET = async(req,{params})=>{

    try{
        await connectMongoDB();
        const response = await Prompt.findById(params.id).populate("creator");


        return new Response(JSON.stringify(response),{status:200})



    }catch(error){
        return new Response("error here ",{status:404} );
    }



}

const PATCH = async(req,{params})=>{
const {prompt,tag} =await req.json();

    try{
        await connectMongoDB();
        const response = await findById(params.id);
        if (!response) {
            return new Response("Prompt not found", { status: 404 });
        }
        response.prompt = prompt;
        response.tag = tag;
        
        await response.save();
        return new Response(JSON.stringify(response),{status:201});

    }catch(error){
        return new Response("something error happeining while updating");
    }


}


const DELETE = async(req,{params})=>{


    try{
        await connectMongoDB();
        await findByIdAndDelete(params.id);

        return new Response("Prompt Deleted Successfully",{status:200});
    }
    catch(error){
        return new Response("Someting error happeininiinining while deleting",{status:303});
    }


}