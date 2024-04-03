import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const GoogleProvider = Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// const CredentiasProvider = Credentials({
//     name: 'Credentials',
//     credentials: {
//         email: {},
//         password: {}
//     },
//     async authorize(credentials) {
//         console.log('credentials : ', credentials);
//         await connectToDB();
//         const userExists = await User.findOne({ email: credentials?.email, password: credentials?.password });
//         console.log('userExists : ', userExists);
//         if (userExists) return ({ id: userExists.id, email: userExists.email!, password: userExists.password! });
//         return null;
//     }
// });

const handler = NextAuth({
    providers: [
        GoogleProvider,
        // CredentiasProvider
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser?._id.toString();
            return session;
        },
        // async signIn({ account, profile, user, credentials }) {
        async signIn({ profile }) {
            try {
                await connectToDB();

                // const userExists = await User.findOne({ email: profile?.email || credentials?.email });
                const userExists = await User.findOne({ email: profile?.email });

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.picture,
                    });
                }

                return true;
            } catch (error) {
                console.error('Error checking if user exists: ', error);
                return false;
            }
        }
    },
    pages: {
        signIn: '/auth/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
    }
});

export { handler as GET, handler as POST };