import userDataLayer from '../data/userDataLayer';  
import { IUser } from '../dp/schemas'  
import { ValidationError , NotFoundError } from '../util/errorHandling';

class UserService {  
    async getUserFriendsById(userId: string): Promise<IUser | null>{
        try {
        return await userDataLayer.getUserFriends(userId,["name"]);     
        } catch (error) { 
            throw error;
        }
    }
    async updateUserById(userId: string, userData: Partial<IUser>): Promise<IUser | null> {  
        try {  
            if (!userData.email && !userData.password) 
            throw new ValidationError("At least one field (email or password) must be provided for update.");  
            return await userDataLayer.updateUserById(userId, userData);
        } catch (error) {  
            throw error;
        }  
    }  
    async addFriend(userId: string, friendId: string) {
        try {
        if (userId === friendId) {  
            throw new ValidationError("You cannot add yourself as a friend.");  
            }  
        const user = await userDataLayer.getUserById(userId ,[]);  
        const friend = await userDataLayer.getUserById(friendId ,[]);  

        if (!user)  
            throw new NotFoundError("User not found");  
        if (!friend) 
            throw new NotFoundError("Friend not found");  
        if (user.friends.includes(friend.id)) 
                throw new ValidationError("You are already friends with this user.");  
        user.friends.push(friend.id);  
        return await userDataLayer.updateUserById(userId, { friends: user.friends });  
        } catch (error) { throw error; } 
    }
async removeFriend(userId: string, friendId: string) {
        try {
        if (userId === friendId) {  
            throw new ValidationError("You cannot add yourself as a friend.");  
            }  
        const user = await userDataLayer.getUserById(userId ,[]);  
        const friend = await userDataLayer.getUserById(friendId ,[]);  

        if (!user)  
            throw new NotFoundError("User not found");  
        if (!friend) 
            throw new NotFoundError("Friend not found");  
        if (!user.friends.includes(friend.id)) 
                throw new ValidationError("You are already  not friends with this user.");  
            user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        return await userDataLayer.updateUserById(userId, { friends: user.friends });  
        } catch (error) { throw error; } 
    }

}  

export default new UserService();  