import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema (
    {
        rating: Number,
        comment: String
    }, {
        timestamps: true,
    }
)

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment