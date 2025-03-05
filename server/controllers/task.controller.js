import taskModel from "../models/task.model.js";
import userModel from '../models/user.model.js'

export const addTask=async(req,res)=>{
    let userId=(req.params.userId);
    const {title,date,desc}=req.body;
    const task=await taskModel.create({title,deadline:date,description:desc,user:userId});
    const user=await userModel.findById(userId);
    user.tasks.push(task._id);
    await user.save();
    return res.status(200).json({user});
}
export const getTask=async(req,res)=>{
    const task=await taskModel.findById(req.params.id);
    return res.status(200).json({task});
}
export const updateTask=async(req,res)=>{
    const {title,desc,completed}=req.body;
    const task=await taskModel.findByIdAndUpdate(req.params.taskId,{
        title,description:desc,completed
    });
    await task.save();
    return res.status(200).json({task});
}