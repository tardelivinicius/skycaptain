import { PropsWithChildren } from 'react'
import MainHeader from '@/app/home/_components/main-header'
import { ThemeProvider } from '../_components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { readUserData } from './(main)/actions'

export default async function Layout({ children }: PropsWithChildren) {
  const user = await readUserData()
  return (
    <div>
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      >
      <MainHeader user={user} />
      <main>{children}</main>
      <Toaster />
      </ThemeProvider>
    </div>
  )
}