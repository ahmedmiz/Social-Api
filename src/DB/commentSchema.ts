import mongoose, { Schema, Document } from "mongoose";
interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  userName: string; 
  postId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId;
  
}
const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Post",
  },
  parentId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Comment",
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
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ parentId: 1, createdAt: -1 });
export { commentSchema , IComment}