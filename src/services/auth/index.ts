import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import EmailProvider from 'next-auth/providers/nodemailer'
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '../database'
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
    signOut: '/',
    newUser: '/home',
    error: '/',
    verifyRequest: '/'
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
  secret: process.env.AUTH_SECRET
})