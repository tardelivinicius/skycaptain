import { User, UserLevel } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: User & {
      level: Level;
    };
  }
}
