import { io } from "../../../server";
import { HotNotification } from "../../model/models";
import { INotification } from "../../DB/notificationSchema";
const broadCastNotification = async (userId: string, socket : string): Promise<void> => { 
    try {
    let userUnPushedNotification : INotification[] = await HotNotification.find({ receiverId: userId });
    if (!userUnPushedNotification.length) return; 
        userUnPushedNotification.forEach((notification) => {
        const notificationData = {
            postId: notification.postId,
            commentId: notification.commentId,
            message: notification.message,
            senderId: notification.senderId,
            senderName: notification.senderName,
            type: notification.type,
            createdAt: notification.createdAt
        }
        io.to(socket).emit("notification", notificationData);
    });
    await HotNotification.deleteMany({ receiverId: userId });


    } catch (error) { 
        throw error;
    }
}

export {broadCastNotification}