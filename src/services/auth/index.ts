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
    async session({ session, token }:{session: any, token: any}) {
      if(session) {
        const currentUser = await db.user.findFirst({
          where: { id: token.sub },
          include: {
            level: true,
            preference: true,
            _count: {
              select: {
                aircrafts: true,
                licenses: true,
              }
            }
          },
        })

        if (currentUser && currentUser.level) {
          const nextLevel = await db.userLevel.findFirst({
            where: { id: { gt: currentUser.level.id } },
            orderBy: { id: 'asc' },
          })
          const licenses = await db.userAirportLicense.findMany({
            where: {userId: currentUser.id},
            include: {
              airport: true
            }
          })
          const aicrafts = await db.userAircraft.findMany({
            where: {userId: currentUser.id},
            include: {
              aircraft: true
            }
          })

          session.user = {
            ...currentUser,
            nextLevel,
            licenses,
            aicrafts
          }
        }
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET
})
