import { connectToDB } from '@utils/database';
import User from '@models/user';

export async function POST(request: Request) {
    try {
        connectToDB();

        const { email, password } = await request.json();

        User.create({
            email: email,
            username: email,
            image: '/assets/images/logo.svg',
            password: password
        });
    } catch (e) {
        console.error(e);
        return new Response('Refister failed', { status: 500 });
    }

    return Response.json({ message: 'success' });
}