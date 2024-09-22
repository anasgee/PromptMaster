import { Schema,model,models } from "mongoose";


const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required!"],
        match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"username is invalid, it should contain 8-20 alphanumeric letters and be unique"],
        },
    email:{
        type:String,
        unique:[true,"Enail Already exists"],
        required:[true,"Email is required"]
    },
    image:{
        type:String
    }
})


const User =models.User || model("User",userSchema);
export default User;