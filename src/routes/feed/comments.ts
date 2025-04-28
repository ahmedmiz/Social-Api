import { Router } from "express";
import PostsController from "../../controllers/feedController";
import isAuth from '../../middlewares/isAuth'; 
import Authorization from "../../middlewares/authorization";
import { validate } from '../../middlewares/validatior';
import { createCommentSchema  ,updateCommentSchema , createReplySchema} from "../../validators/validationSchemas";
const router = Router();


// create a comment on a post 
router.post("/:postId", isAuth, validate(createCommentSchema), PostsController.createComment);
router.post("/replies/:commentId", isAuth, validate(createReplySchema), PostsController.createReply);
router.patch("/:commentId", isAuth, Authorization.comment,validate(updateCommentSchema) , PostsController.updateComment);
router.delete("/:commentId", isAuth, Authorization.comment , PostsController.deleteComment);

export default router;