import { PropsWithChildren } from 'react'
import { ThemeProvider } from '../_components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/services/auth'
import Sidebar from './_components/sidebar'

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
      <Sidebar />
      <main>{children}</main>
      <Toaster />
      </ThemeProvider>
    </div>
  )
}