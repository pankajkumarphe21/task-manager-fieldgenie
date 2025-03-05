import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    deadline: { type: Date, required: true },
    priority : { type: String, enum : ["high", "medium", "low", "urgent"], default: "medium" },
    difficulty: { type: String, enum : ["hard", "medium", "easy"], default: "medium" },
    status: { type: String, enum : ["completed", "pending", "terminated"], default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

const Task=mongoose.model('task',taskSchema);

export default Task;