import User from '@models/user';
import { connectToDB } from '@utils/database';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    if (!ObjectId.isValid(params.id)) return new Response('User Not Found', { status: 404 });

    try {
        await connectToDB();
        const user = await User.findById(params.id);
        return Response.json(user);
    } catch (e) {
        return Response.json(e, { status: 500 });
    }
}