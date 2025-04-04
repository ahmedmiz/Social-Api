import mongoose, { Schema, Document } from "mongoose";
interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  userName: string; 
  postId: mongoose.Types.ObjectId;
  
}
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
export { commentSchema , IComment}