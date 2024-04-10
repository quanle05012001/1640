import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IEntries {
    name: string;
    dateline1: Date;
    dateline2: Date;
    faculty_id: string;
    
}

const IEntriesSchema = new Schema<IEntries>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    dateline1: {
        type: Date,
        required: true,
    },
    dateline2: {
        type: Date,
        required: true,
    },
    faculty_id: {
        type: String,
        required: true,
        trim: true,
    }
   
}, {
    timestamps: true,
});

export const Entries = model<IEntries>('Entries', IEntriesSchema);