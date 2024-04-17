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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonSignOut } from './button-sign-out'
import Link from 'next/link'
import { User } from '@/types/user'
  
type UserDropdownProps = {
  user: User | null
}

export function UserDropdownMenu({ user }: UserDropdownProps) {
    if (!user) return
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className={`rounded-full w-12 h-12 ${user.emailVerified ? 'bg-green-500' : 'bg-orange-500'} ${user.emailVerified ? 'hover:bg-green-700' : 'hover:bg-orange-700'} `}>
              <Avatar className="h-11 w-11">
                  <AvatarImage src={user.image as string} alt={user.name as string} />
                  <AvatarFallback>{ user.name }</AvatarFallback>
              </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href='/home/settings'>Settings</Link></DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <ButtonSignOut />
        </DropdownMenuContent>
        </DropdownMenu>
)
}