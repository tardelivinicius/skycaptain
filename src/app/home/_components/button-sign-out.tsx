'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'

export function ButtonSignOut() {
    return <DropdownMenuItem onClick={() => signOut({callbackUrl: process.env.NEXT_PUBLIC_APP_URL})}>Logout</DropdownMenuItem>
}