import { Schema, model } from 'mongoose';
import { roles } from '../utils';

interface IUser {
    username: string;
    password: string;
    email: string;
    roles: Array<string>;
    words: Array<any>;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    roles: {
        type: [String],
        enum: [roles.guest, roles.student, roles.marketingCoordinator, roles.admin, roles.marketingManager],
        default: [roles.student],
    },
}, {
    timestamps: true,
});

export const User = model<IUser>('User', UserSchema);
