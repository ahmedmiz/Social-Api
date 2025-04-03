import { IPost, IUser ,IComment} from "../../dp/schemas";
interface IUserDataLayer {
    getUserByName(userName: string, fields: string[]): Promise<IUser[]>;
    getUserById(userId: string, fields: string[]): Promise<IUser | null>;
    getUserFriends(userId: string, fields: string[]): Promise<IUser[]>;
    getUserPosts(userId: string, fields: string[]): Promise<IPost[]>;
    getUserComments(userId: string, fields: string[]): Promise<IComment[]>;
    updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId: string): Promise<void>;
}

export default IUserDataLayer;