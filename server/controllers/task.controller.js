import taskModel from "../models/task.model.js";
import userModel from '../models/user.model.js'

export const addTask = async (req, res) => {
    let userId = req.params.userId;
    const { title, deadline, desc, priority, difficulty, status } = req.body;
    console.log(req.body);

    // 1. Check if userId and required fields are present
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (!title || !deadline || !desc || !priority || !difficulty || !status) {
        return res.status(400).json({ message: 'All task fields are required' });
    }

    try {
        // 2. Attempt to create a new task
        const task = await taskModel.create({
            title,
            deadline,
            description : desc,
            priority,
            difficulty,
            status,
            user: userId,
        });

        // 3. Attempt to find the user
        const user = await userModel.findById(userId);

        // 4. If user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 5. Add the new task to the user's task list
        user.tasks.push(task._id);
        await user.save();

        // 6. Return the updated user object
        return res.status(200).json({ user });
    } catch (error) {
        // 7. Catch and handle specific errors
        if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., schema validation issues)
            return res.status(400).json({ message: 'Validation Error', details: error.errors });
        }

        // Handle other types of errors (e.g., database errors)
        console.error(error); // For debugging purposes
        return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id);
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ user: req.params.userId }).sort({ deadline: 'asc' });
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    const { title, desc, status, priority, deadline, difficulty } = req.body;
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.taskId, {
            title, description: desc, priority, status, deadline, difficulty,
        }, { new: true });
        await task.save();
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}