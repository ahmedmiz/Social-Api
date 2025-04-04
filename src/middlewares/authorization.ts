import { NextFunction } from "express";
import postServices from '../services/feedService';
import { ValidationError , apiErrorHandling} from "../util/errorHandling"; 
import { IPost } from "../DB/postSchema";
import { IComment } from '../DB/commentSchema';
export default class Authorization { 
    public static post = async (req: any, res: any, next: NextFunction) => {
        const postId: string = req.params.postId;
        const userId: string = req.userId;
        if (!postId || !userId) {
            apiErrorHandling(new ValidationError("post or user id "), req, res, "post and user id must be provided!" ,400);
            return;
        }
        const post: IPost | null = await postServices.getPostById(postId, ["author"]);
        if (post!.author?.toString() != userId) { apiErrorHandling(new ValidationError("Not authorized"), req, res, "Not authorized"); return;} 
        next();
    }
    public static comment = async (req: any, res: any, next: NextFunction) => {
        const commentId : string = req.params.commentId; 
        const userId: string = req.userId; 
        const comment: IComment | null = await postServices.getCommentById(commentId, ["userId"]);
        if (comment?.userId.toString() !== userId) {
            apiErrorHandling(new ValidationError("Not authorized"), req, res, "Not authorized", 401);
            return;
        }
        next();
    }
}



