import { AuthForm } from '@/app/_components/auth-form'
import { About } from './_components/about'

export default async function Home() {
  return (
    <main>
      <img src="background1.png" className="h-full w-full absolute object-cover dark:brightness-[0.6] dark:grayscale" />
      <div className="flex items-center justify-center relative h-screen">
        <div className="bg-white grid grid-cols-3 rounded-lg">
          <About />
          <AuthForm />
        <div className="bg-orange-600 col-span-3 p-0.5 w-full"></div>
        </div>
      </div>
    </main>
  )
}