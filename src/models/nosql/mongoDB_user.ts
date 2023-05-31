import mongoose, { Document, Schema } from 'mongoose';

// Define the User schema
const UserSchema: Schema = new Schema({
    userName: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

// Define the User document interface (for TypeScript)
export interface IUser extends Document {
    userName: string;
    password: string;
    // any other fields you want to include should be declared here
}

// Define the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;