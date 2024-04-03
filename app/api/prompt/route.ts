import { IUser } from '@models/shared';
import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export async function GET() {
    try {
        await connectToDB();

        const prompts = await Prompt.find().populate<{ user: IUser }>('creator');

        return Response.json(prompts, { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });
    }
};