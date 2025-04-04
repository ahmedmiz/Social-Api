import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "./commentSchema";

interface IPost extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  authorName: string; 
  comments: IComment;
  numberOfComments: number; 
}
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

export { postSchema , IPost}