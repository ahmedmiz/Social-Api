import express from "express";
import isAuth from '../middlewares/isAuth'; 
import userController from '../controllers/userController';
const router = express.Router();
import { validate } from '../middlewares/validatior';
import {updateUserSchema} from "../validators/validationSchemas";




// get all users with prefix = {name} 
router.get("/:userName", userController.getUserByName);
// get user by it's id 
router.get("/:userId", userController.getUserById);

// get all user's friends 
router.get("/friends", isAuth, userController.getUserFiends);

// get all user's posts
router.get("/posts", isAuth, userController.getUserPosts);

// get all user's comments 
router.get("/comments", isAuth, userController.getUserComments);

// update user's name 

router.patch("/userName", isAuth, validate(updateUserSchema),userController.updateUser);

// delete a user
router.delete("/", isAuth, userController.deleteUser);



export default router;
