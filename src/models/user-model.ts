import { Schema, model, Document } from 'mongoose';


// Extend the Document interface to include custom fields for User
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

// Define the schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create and export the model
const User = model<IUser>('User', userSchema);
export default User;
