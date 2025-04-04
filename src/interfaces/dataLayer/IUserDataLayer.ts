import { IPost } from "../../DB/postSchema";
import { IComment } from '../../DB/commentSchema';
import { IUser } from "../../DB/userSchema";
interface IUserDataLayer {
    addUser(name: string, email: string, password: string): Promise<IUser | null>;
    getUserByEmail(email: string,fields: string[] ): Promise<IUser | null>; 
    getUserByName(userName: string, fields: string[]): Promise<IUser[]>;
    getUserById(userId: string, fields: string[]): Promise<IUser | null>;
    getUserFriends(userId: string, fields: string[]): Promise<IUser[]>;
    getUserPosts(userId: string, fields: string[]): Promise<IPost[]>;
    getUserComments(userId: string, fields: string[]): Promise<IComment[]>;
    updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId: string): Promise<void>;
}

export default IUserDataLayer;