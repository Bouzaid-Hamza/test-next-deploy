import { Types } from 'mongoose';

// export interface IUser {
//     _id?: string;
//     email: string;
//     username: string;
//     image?: string;
//     password?: string;
// }

// export interface IPrompt {
//     _id?: string;
//     creator?: string | IUser;
//     text: string;
//     tag: string;
// }

export interface IUser {
    _id?: Types.ObjectId;
    email?: string;
    username: string;
    image?: string;
    // password?: string;
}

export interface IPrompt {
    _id?: Types.ObjectId;
    creator?: Types.ObjectId | IUser;
    text: string;
    tag: string;
}

export interface UserClient extends Omit<IUser, '_id'> {
    _id?: string;
}

export interface PromptClient extends Omit<IPrompt, '_id' | 'creator'> {
    _id?: string;
    creator?: string | UserClient;
}

export const isUserPopulated = (obj: IPrompt['creator'] | PromptClient['creator']): obj is IUser => {
    // return Boolean(obj && 'username' in obj);
    return Boolean(obj && typeof obj !== 'string' && 'username' in obj);
};