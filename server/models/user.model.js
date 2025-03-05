import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        minLength:[6,'Email must be atleast 6 characters long'],
        maxLength:[50,'Email must not be more than 50 characters long']
    },
    password:{
        type:String,
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:'task'
        }
    ]
})

const User=mongoose.model('user',userSchema)

export default User;