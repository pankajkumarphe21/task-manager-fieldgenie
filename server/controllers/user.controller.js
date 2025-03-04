import userModel from "../models/user.model";
import jwt from 'jsonwebtoken'

export const loginUser=async(req,res)=>{
    
}
export const registerUser=async(req,res)=>{
    const {email,password}=req.body;
    const existingUser=await userModel.findOne({email});
    if(existingUser){
        return res.status(404).json({message:'email already registered'})
    }
    const user=await userModel.create({email,password});
    
    return res.status(200).json({user});
}