import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/DB/dp";
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
import { app } from './src/index';
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    "Error on connecting the server to the database";
  });