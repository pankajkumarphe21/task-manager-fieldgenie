import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDb from "./db/db.js";
import authRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js'
import morgan from "morgan";

dotenv.config();

const app=express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/auth',authRoutes);
app.use('/task',taskRoutes);

app.listen(process.env.PORT);