import { NextFunction } from "express";
import postServices from '../services/postServices';
import { ValidationError , apiErrorHandling} from "../util/errorHandling"; 
import { IPost , IComment } from "../dp/schemas";
export default class Authorization { 
    public static post = async (req: any, res: any, next: NextFunction) => {
        const postId: string = req.body.postId;
        const userId: string = req.userId;
        if (!postId || !userId) {
            apiErrorHandling(new ValidationError("post or user id "), req, res, "post and user id must be provided!" ,400);
            return;
        }
        const postUser: IPost | null = await postServices.getPostById(postId, ["author"]);
        if (postUser?.toString() !== userId) { apiErrorHandling(new ValidationError("Not authorized"), req, res, "Not authorized"); return;} 
        next();
    }
    public static comment = async (req: any, res: any, next: NextFunction) => {
        const commentId : string = req.body.commentId; 
        const userId: string = req.userId; 
        const commentUser :  IComment | null = await postServices.getCommentById(commentId, ["author"]);
        if (commentUser?.toString() !== userId) {
            apiErrorHandling(new ValidationError("Not authorized"), req, res, "Not authorized", 401);
            return;
        }
        next();
    }
}



