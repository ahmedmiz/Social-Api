import { NextFunction } from "express";
import postServices from '../services/postServices';
import { ValidationError } from "../util/errorHandling"; 
import { IPost , IComment } from "../dp/schemas";
export default class Authorization { 
    public static post = async (req: any, res: any, next: NextFunction) => {
        const postId: string = req.body.postId; 
        const userId: string = req.userId; 
        const postUser: IPost | null = await postServices.getPostById(postId, ["author"]);
        if (postUser?.toString() !== userId) throw new ValidationError("Not authorized"); 
        next();
    }
    public static comment = async (req: any, res: any, next: NextFunction) => {
        const commentId : string = req.body.commentId; 
        const userId: string = req.userId; 
        const commentUser :  IComment | null = await postServices.getCommentById(commentId, ["author"]);
        if (commentUser?.toString() !== userId) throw new ValidationError("Not authorized"); 
        next();
    }
}



