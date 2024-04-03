import User from '@models/user';
import { connectToDB } from '@utils/database';

export async function GET() {
    await connectToDB();
    const users = await User.find();
    return Response.json(users);
}