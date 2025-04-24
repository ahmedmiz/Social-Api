import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "./commentSchema";


enum PostVisibility {
  PUBLIC = "PUBLIC",
  FRIENDS = "FRIENDS",
  PRIVATE = "PRIVATE"
}

interface IPost extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  userName: string; 
  comments: IComment;
  numberOfComments: number; 
  visibility: PostVisibility;
  likes: mongoose.Types.ObjectId[];
  numberOfLikes: number;
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
  visibility: {
    type: String,
    enum: Object.values(PostVisibility),
    default: PostVisibility.PUBLIC
  },
   likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
    ],
  comments: [
    { type: Schema.Types.ObjectId, ref: "Comment" }
  ],
  numberOfComments: {
    type: Number,
    default: 0 , 
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true, autoIndex: false });

export { postSchema , IPost}