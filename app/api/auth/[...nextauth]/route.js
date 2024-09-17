import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


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
    async session({session}){},
    async signIn({profile}){

        // try{


        //     //Lambda function that opens up only when it called 

        // }catch(error){

        // }

    },
})

export {handler as GET,handler as POST }