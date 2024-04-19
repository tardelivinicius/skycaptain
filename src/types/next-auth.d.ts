// import { User } from '@prisma/client'
import { User } from './user'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
