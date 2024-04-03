import Prompt from '@models/prompt';
import { IUser } from '@models/shared';
import { connectToDB } from '@utils/database';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    if (!ObjectId.isValid(params.id)) return new Response('User Not Found', { status: 404 });

    try {
        await connectToDB();
        const prompts = await Prompt.find({ creator: params.id }).populate<IUser>('creator');
        return Response.json(prompts);
    } catch (e) {
        return new Response('Failed to fetch prompts created by user', { status: 500 });
    }
}