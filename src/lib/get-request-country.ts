'use server'
import { headers } from "next/headers"

export async function getRequestCountry(): Promise<string> {
    const headersList = headers()
    const referer = headersList.get('accept-language')
    if(!referer) return 'US'
    if(referer?.length > 5) {
        return referer?.slice(3, 5)
    }
    return 'US'
}