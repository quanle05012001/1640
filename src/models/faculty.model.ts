import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IFaculty {
    name: string;
    marketing_coordinator_id: string;
}

const FacultySchema = new Schema<IFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    marketing_coordinator_id: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

export const Faculty = model<IFaculty>('Faculty', FacultySchema);