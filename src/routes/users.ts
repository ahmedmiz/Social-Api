import express from "express";
import isAuth from '../middlewares/isAuth'; 
import userController from '../controllers/userController';
const router = express.Router();

router.get("/friends", isAuth, userController.getAllFriends);

router.post("/friends/addFriend/:friendId", isAuth, userController.addFriend);

router.delete("/friends/removeFriend/:friendId", isAuth, userController.removeFriend);

export default router;
