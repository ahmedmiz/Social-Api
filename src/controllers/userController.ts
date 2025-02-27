import { IUser } from '../dp/schemas';
import { apiErrorHandling, NotFoundError, ValidationError , unCaughtErrorHandler} from '../util/errorHandling';
import  userService  from '../services/userServices';


export default class userController{
    public static getAllFriends = async (req: any, res: any) => { 
        try {
            const userId: string = req.user; 
            const friends: IUser | null = await userService.getUserFriendsById(userId);
            res.status(200).json({ friends: friends });
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
          else unCaughtErrorHandler(error, res);
        }
    
    }
    public static addFriend = async (req: any, res: any) => { 
        try {
            const userId : string  = req.user; 
            const friendId : string = req.body.friendId; 
            await userService.addFriend(userId, friendId); 
            res.status(200).json({ message: "Added friend successfully" });
        } catch(error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400);
            else unCaughtErrorHandler(error, res);
        }
    }
    public static removeFriend = async (req: any, res: any) => {
        try {
            const userId : string  = req.user; 
            const friendId : string = req.body.friendId; 
            await userService.removeFriend(userId, friendId); 
            res.status(200).json({ message: "Removed friend successfully" });
        } catch(error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400);
            else unCaughtErrorHandler(error, res);
        }
    }
    
}