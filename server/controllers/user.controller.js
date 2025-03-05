import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const existingUser=await userModel.findOne({email});
    const isCorrect=await bcrypt.compare(password,existingUser.password);
    if(!isCorrect){
        return res.status(404).json({message:'Invalid Credentials'});
    }
    return res.status(200).json({existingUser})
}
export const registerUser=async(req,res)=>{
    const {email,password}=req.body;
    const existingUser=await userModel.findOne({email});
    if(existingUser){
        return res.status(404).json({message:'email already registered'})
    }
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(password,salt);
    const user=await userModel.create({email,password:hash});
    return res.status(200).json({user});
}
export const getTasks=async(req,res)=>{
    const existingUser=await userModel.findById(req.params.userId).populate('tasks');
    if(!existingUser){
        return res.status(404).json({message:'error getting tasks'})
    }
    const tasks=existingUser.tasks;
    return res.status(200).json({tasks});
}