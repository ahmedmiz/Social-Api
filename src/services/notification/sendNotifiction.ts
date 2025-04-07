import {io , connectedUsers} from "../../../server";
import { INotificationObject } from "../../DB/notificationSchema";
import { HotNotification } from "../../model/models";

const sendNotification = async (userId : string,notification: INotificationObject) : Promise<void> => { 
    if (connectedUsers.has(userId)) {
        const socketId = connectedUsers.get(userId);
        if(socketId)
            io.to(socketId).emit("notification", notification);
        return;
    }
    await HotNotification.create({ ...notification });
    return;
}
export {sendNotification}
