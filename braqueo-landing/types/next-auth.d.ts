import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: 'FINDER' | 'SEEKER';
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: 'FINDER' | 'SEEKER';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'FINDER' | 'SEEKER';
  }
}