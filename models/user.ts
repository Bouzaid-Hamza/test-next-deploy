import { Model, Schema, model, models } from 'mongoose';
import { IUser } from './shared';

// export interface UserType {
//     _id?: Types.ObjectId;
//     email: string;
//     username: string;
//     image?: string;
//     password?: string;
// }

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it should contain 8-20 alphanumeric letters and be unique!']
    },
    // password: {
    //     type: String,
    // },
    image: {
        type: String,
    }
});

const User = (models.User || model<IUser>('User', UserSchema)) as Model<IUser>;

// export type UserType = InferSchemaType<typeof UserSchema>;

export default User;