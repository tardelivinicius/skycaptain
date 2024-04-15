'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Session } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonSignOut } from './button-sign-out'
import { redirect } from 'next/navigation'
import Link from 'next/link'
  
  type UserDropdownProps = {
    user: Session['user']
  }
  
  export function UserDropdownMenu({ user }: UserDropdownProps) {
    if (!user) return
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user.image as string} alt={user.name as string} />
                <AvatarFallback>{ user.name }</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href='/home/settings'>Preferences</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href='/home/settings'>Settings</Link></DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <ButtonSignOut />
        </DropdownMenuContent>
        </DropdownMenu>
)
}