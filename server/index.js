import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config();

const app=express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use('/auth',);

app.listen(process.env.PORT);