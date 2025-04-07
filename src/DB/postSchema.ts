import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "./commentSchema";

interface IPost extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  userName: string; 
  comments: IComment;
  numberOfComments: number; 
}
const postSchema = new Schema<IPost>({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
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

export { postSchema , IPost}