import { Model, Schema, model, models } from 'mongoose';
import { IPrompt } from './shared';

// export interface PromptType {
//     _id?: Types.ObjectId;
//     creator?: Types.ObjectId | UserType;
//     text: string;
//     tag: string;
// }

// export const isUserPopulated = (obj: PromptType['creator']): obj is UserType => {
//     return Boolean(obj && 'username' in obj);
// };


const PromptSchema = new Schema<IPrompt>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: [true, 'Creator is required.'],
    },
    text: {
        type: String,
        required: [true, 'Text is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

const Prompt = (models.Prompt || model<IPrompt>('Prompt', PromptSchema)) as Model<IPrompt>;

// export type PromptType = InferSchemaType<typeof PromptSchema>;

export default Prompt;