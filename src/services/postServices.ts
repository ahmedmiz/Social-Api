import postDataLayer from '../data/postDataLayer';  
import userDataLayer from '../data/userDataLayer';
import { IComment, IPost , IUser } from '../dp/schemas'  
import { ValidationError , NotFoundError } from '../util/errorHandling';

class UserService {  
    async getAllPosts(pageNumber : number = 0 ): Promise<IPost[] | null >{
        try { 
            const fields: string[] = ["content", "author", "authorName"];
            const posts: IPost[] | null = await postDataLayer.getAllPosts(pageNumber, fields);
            return posts; 
        } catch (error) { 
            throw error;
        }
    }
    async getPostById(postId: string , fields : string[]): Promise<IPost | null> { 
        try {
            const post: IPost | null = await postDataLayer.getPostById(postId, fields);
            return post;
        } catch (error) { 
            throw error; 
        }
    }
    async getUserPostsById(userId: string): Promise<IPost[] | null>{
    try {
        const fields: string[] = ["content", "author", "authorName"];
        const posts: IPost[] | null = await userDataLayer.getUserPostsById(userId, fields);
        return posts; 
        } catch (error) { 
            throw error; 
        }
    }
    async createPost(content : string , userName : string , userId : string): Promise<IPost | null>{
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must be provided!");
            const post: IPost | null = await postDataLayer.createPost(content, userName, userId);
            if (!post) 
                throw new ValidationError("Post creation failed or post ID is invalid.");
            const addPostToUser: Boolean = await userDataLayer.addPostToUser(userId, post.id);
            return post; 
        } catch (error) { 
            throw error; 
        }
    }
    async updatePost(content : string , postId : string ): Promise<IPost | null>{
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must provided!");
            const post: IPost | null = await postDataLayer.updatePostContent(content, postId);
            if (!post) 
                throw new ValidationError("Post updated failed or post ID is invalid.");
            return post; 
        } catch (error) { 
            throw error; 
        }
    }
    async deletePost(postId : string ): Promise<void | null>{
        try {
            await postDataLayer.deletePost(postId);
        } catch (error) { 
            throw error; 
        }
    }
    async getCommentById(commentId: string , fields : string[]): Promise<IComment | null> { 
        try {
            const comment: IComment | null = await postDataLayer.getCommentById(commentId, fields);
            return comment;
        } catch (error) { 
            throw error; 
        }
    }
    async getCommentsByPostId(postId : string): Promise<any | null>{
        try {
            const comments: any = await postDataLayer.getCommentsByPostId(postId);
            return comments; 
        } catch (error) { 
            throw error; 
        }
    }
     async createComment(content : string , postId : string  , userName : string , userId : string): Promise<IComment | null>{
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must provided!");
            await postDataLayer.getPostById(postId, ["author"]); 
            const comment: IComment | null = await postDataLayer.createComment(content, userName, userId, postId);
            if (!comment) 
                throw new ValidationError("Comment creation failed or comment ID is invalid.");
            return comment; 
        } catch (error) { 
            throw error; 
        }
     }
     async updateComment(content : string , commentId : string ): Promise<void | null>{
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must provided!");
            await postDataLayer.updateComment(content, commentId); 
        } catch (error) { 
            throw error; 
        }
     }
    async deleteComment(commentId : string ): Promise<void | null>{
        try {
        await postDataLayer.deleteComment(commentId); 
        } catch (error) { 
            throw error; 
        }
    }
}  

export default new UserService();  