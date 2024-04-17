'use server'
import { getRequestCountry } from "@/lib/get-request-country"
import { auth } from "@/services/auth"
import db from '@/services/database'
import { User } from "@/types/user"
import { generateUserData } from '@/services/auth/functions/generate-user-data'

export async function readUserData(): Promise<User | null> {
  const session = await auth()
  if(!session) return null
  const user = await db.user.findFirst({
    where: { id: session.user.id },
    include: {
      level: true,
      preference: true,
      _count: {
        select: {
          airports: true,
          aircrafts: true
        }
      }
    },
  })
  if(!user) return null
  return user
}

export async function checkUserFirstAccess() {
  const session = await auth()
  if(!session) return true
  return session?.user.isFirstAccess
}

interface UserPreferencesData {
  username: string;
  currency: string;
  weight: string;
}

export async function saveUserData({ data }: { data: UserPreferencesData }): Promise<boolean> {
  try {
    const session = await auth()
    if(!session) return false
    const reqCountryCode = await getRequestCountry()
    const { username, weight, currency } = data;
    await db.user.update({
      where: { id: session.user.id },
      data: {
        username: username
      }
    })
    await db.userPreference.upsert({
        where: {
          id: session?.user?.preferenceId ?? 0
        },
        create: {
            user: { connect: { id: session?.user?.id }},
            currency: currency,
            weight: weight,
            countryCode: reqCountryCode,
            userId: session?.user?.id
        },
        update: {
          currency: currency,
          weight: weight,
          countryCode: reqCountryCode
        }
      });
      generateUserData(session.user)
      return true
    } catch (error) {
      return false;
    } finally {
      await db.$disconnect();
    }
}

export async function checkUsernameAvailability( username:string ): Promise<boolean> {
  const session = await auth()
  const check = await db.user.findFirst({
    where: { 
      username: username,
      NOT: {
        id: session?.user.id
      }
    }
  })
  if(!check) return false
  return true
}