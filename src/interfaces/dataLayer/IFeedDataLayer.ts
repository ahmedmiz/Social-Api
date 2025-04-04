import { IPost } from "../../DB/postSchema";
import { IComment } from '../../DB/commentSchema';

interface IFeedDataLayer { 
    getAllPosts(page: number , fields:string[]): Promise<IPost[]>;
    getPostById(PostId: string , fields:string[]): Promise<IPost | null>;
    createPost(content: string, userId: string, userName: string): Promise<IPost | null>;
    updatePostContent(content: string, postId: string): Promise<IPost | null>;
    deletePost(id: string): Promise<Boolean>;
    getPostComments(postId: string, fields: string[]): Promise<IComment[]>;
    getCommentById(commentId: string, fields: string[]): Promise<IComment | null>;
    createComment(constent: string, userId: string, userName: string, postId: string): Promise<IComment | null>;
    updateCommentContent(content: string, commentId: string): Promise<IComment | null>;
    deleteComment(commentId: string): Promise<Boolean>;

}

export default IFeedDataLayer;