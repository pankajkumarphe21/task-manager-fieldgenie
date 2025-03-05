import express from "express";
import { addTask, getTask, updateTask } from "../controllers/task.controller.js";

const router=express.Router();

router.post('/add/:userId',addTask);
router.put('/update/:taskId',updateTask);
router.get('/:id',getTask);

export default router;