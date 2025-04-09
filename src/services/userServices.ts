import userDataLayer from '../data/userDataLayer';  
import { IPost } from "../DB/postSchema";
import { IComment } from '../DB/commentSchema';
import { IUser } from '../DB/userSchema';
import IUserServices from '../interfaces/services/IUserServices';
import { INotification, INotificationObject , NotificationType} from '../DB/notificationSchema';
import { sendNotification } from './notification/sendNotifiction';
import { ValidationError } from '../util/errorHandling';
class UserService implements IUserServices{  
    async getUserByname(userName: string, fields: string[]): Promise<IUser[]> {
        try { 
            const users: IUser[] | null = await userDataLayer.getUserByName(userName, fields);
            return users ? users : []; 
        } catch (error) { 
            throw error; 
        }
    }
   async getUserById(userId: string, fields: string[]): Promise<IUser | null> {
        try {
            const user:  IUser | null   = await userDataLayer.getUserById(userId, fields); 
            return user; 
        } catch (error) { 
            throw error; 
        }
    }
    async getUserFriends(userId: string,fields:string[]): Promise<IUser[]>{
        try {

            const friends: IUser[] = await userDataLayer.getUserFriends(userId, fields);   
            return friends ? friends : [];    
        } catch (error) { 
            throw error;
        }
    }
    async getUserPosts(userId: string, fields: string[]): Promise<IPost[]> {
        try {
            const posts: IPost[] | null = await userDataLayer.getUserPosts(userId, fields);
            return posts ? posts : [];

        } catch (error) { 
            throw error; 
        }
    }
    async getUserComments(userId: string, fields: string[]): Promise<IComment[]> {
        try { 
            const comments: IComment[] = await userDataLayer.getUserComments(userId, fields); 
            return comments ? comments : [];
        } catch (error) { 
         throw error; 
        } 
    }
    
    async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {  
        try {  
            return await userDataLayer.updateUser(userId, userData);
        } catch (error) {  
            throw error;
        }  
    }
    async deleteUser(userId: string): Promise<void> {
        try { 
            await userDataLayer.deleteUser(userId);
        } catch (error) { throw error; }
    }
    async getUserNotifiactions(userId : string): Promise<INotification[]> {
        try { 
            const notifications: INotification[] = await userDataLayer.getUserNotifiactions(userId);
            return notifications ? notifications : [];
        }catch(error) { 
            throw error;
        }
    
    }
    async addFriend(userId : string  , userName : string , friendId : string): Promise<void> {
        try { 
            // check if valid friend 
            const friend = await userDataLayer.getUserById(friendId, ["name"]);
            if (!friend) throw new ValidationError("friend not found!");
            // get user friends 
            const userFriends: IUser[] = await userDataLayer.getUserFriends(userId, [""]);
            // check if already a friend 
            userFriends.forEach((e) => { if (e._id == friendId) throw new ValidationError("already a friend") });
          
            // constract notification
            const notification  : INotificationObject = {
                senderId: userId,
                senderName: userName,
                receiverId: friendId,
                type: NotificationType.FRIEND_REQUEST,
                createdAt: new Date(),
                message: "hey, want to be friends?",        
            }
            // send the notification to the friend requested
            await sendNotification(friendId, notification); 
            // save the notification to the friend DB 
            await userDataLayer.addNotificationToUser(friendId , notification)
            return; 
        }catch(error) { 
            throw error;
        }
    
    }

   
}  

export default new UserService();  