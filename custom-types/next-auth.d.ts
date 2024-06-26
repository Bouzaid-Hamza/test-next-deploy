import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      // id: Types.ObjectId;
      id?: string;
    } & DefaultSession['user']
  }

  interface Profile {
    picture: string
  }
}

// import 'next-auth';
// import { User as UserModel, Account as AccountModel } from '@prisma/client';

// declare module 'next-auth' {
//   interface User extends Pick<UserModel, 'id' | 'email'> {}
//   interface Account extends AccountModel {}

//   interface Session {
//     user: User;
//     expires: string;
//   }
// }