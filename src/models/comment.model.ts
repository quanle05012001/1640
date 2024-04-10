import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IComment{
    text: string;
    user_id: string;
    article_id: string;
}

const CommentSchema = new Schema<IComment>({
    text: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    article_id: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

export const Comment = model<IComment>('Comment', CommentSchema);