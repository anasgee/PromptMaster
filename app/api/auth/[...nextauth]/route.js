import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectMongoDB } from "@utils/database";
import User from "@models/user"

// console.log({
//     clientId:process.env.CLIENT_ID,
//     clientSecret:process.env.CLIENT_SECRET,
// })

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
        })
    ],


    callbacks:{

    
        async session({session}){

            const sessionUser = await User.findOne({
               email:session.user.email
            });
   
            session.user.id = sessionUser._id.toString();
   return session;
   
       }, 
       async signIn({profile}){    
   
           try{  
           //Lambda function that opens up only when it called
           // serverless -> lambda ->dynamongoDB
   
           await connectMongoDB();
   
           //check if user is already saved in database
           const userExists = await User.findOne({
               email:profile.email,
           
           });
   
   
           //if not, create a new user
   if(!userExists){
    await User.create({
        email: profile.email,
        username: profile.name.replace(/\s/g, "").toLowerCase(),
        image: profile.picture
    })
   }
            return true;
           }catch(error){
               console.log("Error is generated while authenticating " + error);
               return false;
           }
   
       }
    }

//   }
})

export {handler as GET,handler as POST }