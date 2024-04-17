import { PropsWithChildren } from 'react'
import MainHeader from '@/app/home/_components/main-header'
import { auth } from '@/services/auth'
import { ThemeProvider } from '../_components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()
  return (
    <div>
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      >
      <MainHeader user={session?.user} />
      <main>{children}</main>
      <Toaster />
      </ThemeProvider>
    </div>
  )
}

