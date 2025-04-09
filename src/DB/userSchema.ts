import{ Schema, Document } from "mongoose";
import { IPost } from "./postSchema";
import { IComment } from "./commentSchema";
import { INotification } from "./notificationSchema";
interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  friends: IUser[];
  posts: IPost[];
  comments: IComment[];
  notifications: INotification[];
  resetToken: string; 
  resetTokenExpiresAt: Date; 
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    { type: Schema.Types.ObjectId, ref: "User" }
  ],
  posts: [
    { type: Schema.Types.ObjectId, ref: "Post" }
  ],
  comments: [
    { type: Schema.Types.ObjectId, ref: "Comment" }
  ],
  notifications: [
    { type: Schema.Types.ObjectId, ref: "UserNotification" }  
  ],
  resetToken: {
    type: String,
    default: null,
    
  },
  resetTokenExpiresAt: {
    type: Date,
    default: null ,
  },
}, { timestamps: true, autoIndex: false });
export { userSchema, IUser };