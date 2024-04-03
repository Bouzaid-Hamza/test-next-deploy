import Prompt from '@models/prompt';
import { IUser } from '@models/shared';
import { connectToDB } from '@utils/database';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    if (!ObjectId.isValid(params.id)) return new Response('Prompt Not Found', { status: 404 });

    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate<{ user: IUser }>('creator');
        if (!prompt) return new Response('Prompt Not Found', { status: 404 });

        return Response.json(prompt, { status: 200 });

    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
};

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    if (!ObjectId.isValid(params.id)) return new Response('Prompt Not Found', { status: 404 });

    const { text, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response('Prompt not found', { status: 404 });

        existingPrompt.text = text;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response('Successfully updated the Prompts', { status: 200 });
    } catch (error) {
        return new Response('Error Updating Prompt', { status: 500 });
    }
};

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    if (!ObjectId.isValid(params.id)) return new Response('Prompt Not Found', { status: 404 });

    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Error deleting prompt', { status: 500 });
    }
};