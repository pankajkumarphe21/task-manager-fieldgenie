import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    deadline: { type: Date, required: true }, 
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

const Task=mongoose.model('task',taskSchema);

export default Task;