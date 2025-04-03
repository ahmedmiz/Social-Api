import express from "express";
import isAuth from '../middlewares/isAuth'; 
import userController from '../controllers/userController';
const router = express.Router();

router.get("/friends", isAuth, userController.getUserFiends);

export default router;
