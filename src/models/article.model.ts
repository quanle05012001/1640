import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IArticle {
    files: Array<string>;
    images: Array<string>;
    entry_id: string;
    student_id: string;
    faculty_id: string;
    term_condition: boolean;
}

const ArticleSchema = new Schema<IArticle>({
    files: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    entry_id: {
        type: String,
        required: true,
        trim: true,
    },
    student_id: {
        type: String,
        required: true,
        trim: true,
    },
    faculty_id: {
        type: String,
        required: true,
        trim: true,
    },
    term_condition: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
});

export const Article = model<IArticle>('Article', ArticleSchema);