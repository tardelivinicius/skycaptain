'use server'

import { getRequestCountry } from "@/lib/get-request-country"
import { auth } from "@/services/auth"
import { db } from '@/services/database'
import { generateUserData } from '@/services/auth/functions/generate-user-data'

export async function checkUserFirstAccess() {
  const session = await auth()
  if(!session) return true
  return session?.user.isFirstAccess
}


export async function getUserPreferences() {
  const session = await auth()
  const preferences = await db.userPreference.findFirst({
    where: {
      userId: session?.user.id
    },
  })
  return preferences
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
  console.log('username', username)
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