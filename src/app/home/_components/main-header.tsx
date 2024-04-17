'use client'
import { Session } from 'next-auth'
import Link from "next/link"
import {
  Menu,
  Package2,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/app/home/_components/set-theme"
import { Button } from '@/components/ui/button'
import { UserDropdownMenu } from './user-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { checkUserFirstAccess } from '../(main)/actions'
import { useEffect, useState } from 'react'
import { UpdatePreferences } from './update-user'

type MainHeaderProps = {
  user: Session['user']
}

export default function MainHeader({ user }: MainHeaderProps) {
  const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        const showDialog = await checkUserFirstAccess();
        setOpenDialog(showDialog);
      };
      fetchData();
  }, []);
  return(
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/home"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Avatar>
            <AvatarFallback className='bg-orange-500 text-3xl'>S</AvatarFallback>
          </Avatar>
        </Link>
          <Link
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
          >
          Dashboard
          </Link>
          <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
          >
          Hangar
          </Link>
          <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
          >
          Flights
          </Link>
          <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
          >
          Shop
          </Link>
      </nav>
      <Sheet>
          <SheetTrigger asChild>
          <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
          >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
          </Button>
          </SheetTrigger>
          <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
              <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
              >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
              Dashboard
              </Link>
              <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              >
              Orders
              </Link>
              <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              >
              Products
              </Link>
              <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              >
              Customers
              </Link>
              <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              >
              Analytics
              </Link>
          </nav>
          </SheetContent>
      </Sheet>
      <div className="relative flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial relative">
          </div>
          <ModeToggle />
          <UserDropdownMenu user={user} />
      </div>
      <UpdatePreferences openDialog={openDialog} setOpenDialog={setOpenDialog}/>
      </header>
    )
}