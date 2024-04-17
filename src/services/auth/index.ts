import NextAuth, { Session } from "next-auth"
import Google from "next-auth/providers/google"
import EmailProvider from 'next-auth/providers/nodemailer'
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '../database'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
    signOut: '/',
    newUser: '/home',
    error: '/',
    verifyRequest: '/'
  },
  session: {
    strategy: "jwt",
    maxAge: 48 * 60 * 60, // 2 Dias
  },
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Google({ 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Discord,
  ],
  callbacks: {
    async session({ session }:{session: any}) {
      if(session) {
        session.user = await db.user.findFirst({
          where: {email: session.user.email}
        })
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET
})
