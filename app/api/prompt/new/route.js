import {connectMongoDB} from "@utils/database";
// import User from "@models/user";
import Prompt from "@models/prompt";
export const POST = async(req)=>{ 
    const {userId, prompt,tag } =await req.json();
    try{
        connectMongoDB();
        const newPromtpt= new Prompt({
            creator:userId,
            prompt,
            tag
        })
        await newPromtpt.save();
        // console.log(newPromtpt);
    return new Response(JSON.stringify(newPromtpt),{status:201});}
    catch(error){
        return new Response("There is an error, so prompt cannot be created",{status:404});
    }
}