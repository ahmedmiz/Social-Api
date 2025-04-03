import mongoose, { Schema, Document } from "mongoose";
interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  friends: IUser[];
  posts: IPost[];
  comments: IComment[];
  resetToken: string; 
  resetTokenExpiresAt: Date; 
}
interface IPost extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  authorName: string; 
  comments: IComment;
  numberOfComments: number; 
}
interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  userName: string; 
  postId: mongoose.Types.ObjectId;
  
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
  resetToken: {
    type: String,
    default: null,
    
  },
  resetTokenExpiresAt: {
    type: Date,
    default: null ,
  },
}, { timestamps: true, autoIndex: false });
const postSchema = new Schema<IPost>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
  },
  comments: [
    { type: Schema.Types.ObjectId, ref: "Comment" }
  ],
  numberOfComments: {
    type: Number,
    default: 0 , 
  },
}, { timestamps: true, autoIndex: false });
const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userName: {
    type : String ,
  },
}, { timestamps: true, autoIndex: false });
const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true, autoIndex: false });
export { userSchema, postSchema, commentSchema, tokenBlacklistSchema, IUser, IPost, IComment };

