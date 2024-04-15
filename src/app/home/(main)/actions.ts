'use server'

import { getRequestCountry } from "@/lib/get-request-country"
import { auth } from "@/services/auth"
import { db } from '@/services/database'
import { headers } from "next/headers"

export async function checkUserPreferences() {
  const session = await auth()

  const preferences = await db.userPreference.findFirst({
    where: {
      user: session?.user
    },
  })
  if(!preferences) return true
  return false
}

interface UserPreferencesData {
  currency: string;
  weight: string;
}

export async function saveUserPreferences({ data }: { data: UserPreferencesData }): Promise<boolean> {
  try {
    const session = await auth()
    const reqCountryCode = await getRequestCountry()
    const { weight, currency } = data;
    await db.userPreference.upsert({
      where: {
        id: session?.user?.preferenceId ?? 0
      },
      create: {
          user: { connect: { id: session?.user?.id }},
          currency: currency,
          weight: weight,
          countryCode: reqCountryCode
      },
      update: {
        currency: currency,
        weight: weight,
        countryCode: reqCountryCode
      }
    });
      return true
    } catch (error) {
      return false;
    } finally {
      await db.$disconnect();
    }
}