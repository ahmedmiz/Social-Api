import express from "express";
import isAuth from '../middlewares/isAuth'; 
import userController from '../controllers/userController';
const router = express.Router();
import { validate } from '../middlewares/validatior';
import {updateUserSchema} from "../validators/validationSchemas";

/*
- retrieves all users with prefix name 
- returns an array of users
- requires userName
- Authentication: No
- Authorization: No
- Method: GET
- URL: /users/
- Body: {}
- parameters: { userName: string }
- Response: {
  "success": true,
  "message": "users retrieved successfully.",
  "data": {[ users : IUser ]}
}
- Error: 400 Bad Request 
*/
router.get("/:userName", userController.getUserByName);

/*
- retrieves a user by their ID
- returns the user object
- Authentication: No
- Authorization: No
- Method: GET
- URL: /users/:userId
- Body: {}
- parameters: { userId: string }
- Response: {
  "success": true,
  "message": "user retrieved successfully.",
  "data": { User : IUser }
}
- Error: 404 Not Found
*/
router.get("/:userId", userController.getUserById);

/*
- retrieves all friends of the authenticated user
- returns an array of friends
- Authentication: Yes
- Authorization: No
- Method: GET
- URL: /users/friends
- Body: {}
- parameters: {}
- Response: {
  "success": true,
  "message": "friends retrieved successfully.",
  "data": {[ friends : IUser ]}
}
- Error: 401 Unauthorized
*/
router.get("/friends", isAuth, userController.getUserFiends);

/*
- retrieves all posts of the authenticated user
- returns an array of posts
- Authentication: Yes
- Authorization: No
- Method: GET
- URL: /users/posts
- Body: {}
- parameters: {}
- Response: {
  "success": true,
  "message": "posts retrieved successfully.",
  "data": {[ posts : IPost ]}
}
- Error: 401 Unauthorized
*/
router.get("/posts", isAuth, userController.getUserPosts);

/*
- retrieves all comments of the authenticated user
- returns an array of comments
- Authentication: Yes
- Authorization: No
- Method: GET
- URL: /users/comments
- Body: {}
- parameters: {}
- Response: {
  "success": true,
  "message": "comments retrieved successfully.",
  "data": {[ comments : IComment ]}
}
- Error: 401 Unauthorized
*/
router.get("/comments", isAuth, userController.getUserComments);

/*
- updates the authenticated user's name
- returns the updated user object
- Authentication: Yes
- Authorization: No
- Method: PATCH
- URL: /users/userName
- Body: { userName: string }
- parameters: {}
- Response: {
  "success": true,
  "message": "user updated successfully.",
  "data": { User : IUser }
}
- Error: 400 Bad Request, 401 Unauthorized
*/
router.patch("/userName", isAuth, validate(updateUserSchema), userController.updateUser);

/*
- deletes the authenticated user
- returns a success message
- Authentication: Yes
- Authorization: No
- Method: DELETE
- URL: /users/
- Body: {}
- parameters: {}
- Response: {
  "success": true,
  "message": "user deleted successfully."
}
- Error: 401 Unauthorized
*/
router.delete("/", isAuth, userController.deleteUser);

/*
- retrive a list of notifications for the authenticated user
- returns an array of notifications
- Authentication: Yes
- Authorization: No
- Method: GET
- URL: /users/notifications
- Body: {}
- parameters: {}
- Response: {
  "success": true,
  "message": "notifications retrived successfully."
  "data": {[ notifications : INotification ]}
}
- Error: 401 Unauthorized
*/
router.get("/notifications", isAuth, userController.getUserNotifications);

export default router;
