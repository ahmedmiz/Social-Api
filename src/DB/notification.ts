import{ Schema, Document } from "mongoose";
enum NotificationType {
    LIKE = "LIKE",
    COMMENT = "COMMENT",
    FOLLOW = "FOLLOW",
    MENTION = "MENTION",
    SHARE = "SHARE",
    REPLY = "REPLY",
    POST = "POST",
    FRIEND_REQUEST = "FRIEND_REQUEST",
    FRIEND_REQUEST_ACCEPTED = "FRIEND_REQUEST_ACCEPTED",
    FRIEND_REQUEST_REJECTED = "FRIEND_REQUEST_REJECTED",
}

interface INotification extends Document { 
    senderId: string;
    receiverId: string;
    type: NotificationType;
    createdAt: Date;
    updatedAt: Date;
    message: string;
    IsDeleted: boolean;
    IsRead: boolean;
    userNotificationId: string;
    postId: string;
    commentId: string;
    
}

const notificationSchema = new Schema<INotification>({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
    },
    IsDeleted: {
        type: Boolean,
        default: false,
    }, 
    IsRead: {
        type: Boolean,
        default: false,
    },
    userNotificationId: {
        type: String,
    },
    postId: {
        type: String,
    },
    commentId: {
        type: String,
    }
    

});
export { notificationSchema, INotification, NotificationType };   