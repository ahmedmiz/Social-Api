import { Router } from "express";
import PostsController from "../controllers/feedController";
import isAuth from '../middlewares/isAuth'; 
import Authorization from "../middlewares/authorization";
import { validate } from '../middlewares/validatior';
import { createCommentSchema , createPostSchema ,updateCommentSchema , updatePostSchema} from "../validators/validationSchemas";
const router = Router();


/*
- retrieves all posts
- returns an array of posts
- requires page number 
- Authentication: No
- Authorization: No
- Method: GET
- URL: /feed/
- Body: {}
- parameters: { page: number }
- Response: {
  "success": true,
  "message": "posts retrieved successfully.",
  "data": {[ Post : IPost ]}
}
- Error: 400 Bad Request 
*/
router.get("/", PostsController.getAllPosts);

/*
- retrieves a post by its ID
- returns the post object
- Authentication: No
- Authorization: No
- Method: GET
- URL: /feed/:postId
- Body: {}
- parameters: { postId: string }
- Response: {
  "success": true,
  "message": "post retrieved successfully.",
  "data": { Post : IPost }
}
- Error: 404 Not Found
*/
router.get("/:postId", PostsController.getPostById);

/*
- creates a new post
- returns the created post object
- Authentication: Yes
- Authorization: No
- Method: POST
- URL: /feed/
- Body: { title: string, content: string }
- parameters: {}
- Response: {
  "success": true,
  "message": "post created successfully.",
  "data": { Post : IPost }
}
- Error: 400 Bad Request
*/
router.post("/", isAuth,validate(createPostSchema),PostsController.createPost);

/*
- updates a post's content
- returns the updated post object
- Authentication: Yes
- Authorization: Yes (post owner)
- Method: PATCH
- URL: /feed/:postId
- Body: {  content: string }
- parameters: { postId: string }
- Response: {
  "success": true,
  "message": "post updated successfully.",
  "data": { Post : IPost }
}
- Error: 403 Forbidden, 404 Not Found
*/
router.patch("/:postId", isAuth,Authorization.post ,validate(createPostSchema) , PostsController.updatePost);

/*
- deletes a post
- returns a success message
- Authentication: Yes
- Authorization: Yes (post owner)
- Method: DELETE
- URL: /feed/:postId
- Body: {}
- parameters: { postId: string }
- Response: {
  "success": true,
  "message": "post deleted successfully."
}
- Error: 403 Forbidden, 404 Not Found
*/
router.delete("/:postId", isAuth , Authorization.post , PostsController.deletePost);

/*
- retrieves all comments on a post
- returns an array of comments
- Authentication: No
- Authorization: No
- Method: GET
- URL: /feed/:postId/comments
- Body: {}
- parameters: { postId: string }
- Response: {
  "success": true,
  "message": "comments retrieved successfully.",
  "data": { Comments : IComment[] }
}
- Error: 404 Not Found
*/
router.get("/:postId/comments", PostsController.getCommentsByPostId);

/*
- creates a comment on a post
- returns the created comment object
- Authentication: Yes
- Authorization: No
- Method: POST
- URL: /feed/:postId/comments
- Body: { content: string }
- parameters: { postId: string }
- Response: {
  "success": true,
  "message": "comment created successfully.",
  "data": { Comment : IComment }
}
- Error: 400 Bad Request
*/
router.post("/:postId/comments", isAuth,validate(createCommentSchema),  PostsController.createComment);

/*
- updates a comment's content
- returns the updated comment object
- Authentication: Yes
- Authorization: Yes (comment owner)
- Method: PATCH
- URL: /feed/comments/:commentId
- Body: { content: string }
- parameters: { commentId: string }
- Response: {
  "success": true,
  "message": "comment updated successfully.",
  "data": { Comment : IComment }
}
- Error: 403 Forbidden, 404 Not Found
*/
router.patch("/comments/:commentId", isAuth, Authorization.comment,validate(updateCommentSchema) , PostsController.updateComment);

/*
- deletes a comment
- returns a success message
- Authentication: Yes
- Authorization: Yes (comment owner)
- Method: DELETE
- URL: /feed/comments/:commentId
- Body: {}
- parameters: { commentId: string }
- Response: {
  "success": true,
  "message": "comment deleted successfully."
}
- Error: 403 Forbidden, 404 Not Found
*/
router.delete("/comments/:commentId", isAuth, Authorization.comment , PostsController.deleteComment);

export default router;