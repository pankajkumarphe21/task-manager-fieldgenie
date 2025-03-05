import express from "express";
import { getTasks, loginUser, registerUser } from "../controllers/user.controller.js";

const router=express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/:userId',getTasks);

export default router;