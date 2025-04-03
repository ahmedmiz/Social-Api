import { IComment, IPost, IUser } from "../../dp/schemas";
interface IUserServices { 

    getUserByname(userName: string, fields: string[]): Promise<IUser[]>; 
    getUserById(userId: string, fields: string[]): Promise<IUser | null>; 
    getUserFriends(userId: string, fields: string[]): Promise<IUser[]>;
    getUserPosts(userId: string, fields: string[]): Promise<IPost[]>; 
    getUserComments(userId: string, fields: string[]): Promise<IComment[]>; 
    // need to look into it!!!
    updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId : string) : Promise<void> ; 
  

}

export default IUserServices;