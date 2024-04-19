'use server'
import { getRequestCountry } from "@/lib/get-request-country"
import { auth } from "@/services/auth"
import db from '@/services/database'
import { generateUserData } from '@/services/auth/functions/generate-user-data'

// Função usada para retornar os ultimos voos do usuário
export async function getUserLastFlights() {
  const session = await auth()
  const lastFlights = await db.userFlight.findMany({
    where: {
      userId: session?.user?.id,
    },
    include:{
      arrival: true,
      departure: true,
      aircraft: true,
      user: {
        include: {
          preference: true
        }
      }
    }
  })
  return lastFlights
}

interface UserPreferencesData {
  username: string;
  currency: string;
  weight: string;
}

// Função usada para salvar os dados básicos do usuário
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

// Função usada para retornar se um nickname já existe ou não
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