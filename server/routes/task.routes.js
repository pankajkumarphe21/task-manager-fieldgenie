import express from "express";
import { addTask, getAllTasks, getTask, updateTask } from "../controllers/task.controller.js";

const router=express.Router();

router.post('/add/:userId',addTask);
router.put('/update/:taskId',updateTask);
router.get('/:id',getTask);
router.get('/all/:userId', getAllTasks);

export default router;