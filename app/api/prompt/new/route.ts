import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (request: Request) => {
    const { creator, text, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator, text, tag });
        await newPrompt.save();
        // await Prompt.create({ creator, text, tag });

        return Response.json(newPrompt, { status: 201 });
    } catch (e) {
        console.error(e);
        return new Response('Failed to create a new prompt', { status: 500 });
    }
};