'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaDiscord} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { useToast } from "@/components/ui/use-toast"

export function AuthForm() {
  const form = useForm()
  const { toast } = useToast()
  const signInCredentials = form.handleSubmit(async (data) => {
    const { email } = data
    await signIn('nodemailer', {email, redirect: false, callbackUrl: 'http://localhost:3000/home'})
      .then((e) => {
        toast({
          title: "Magic link sent!",
          description: "Check your inbox to proceed with login",
        })
      })
  })
  const signInGoogle = form.handleSubmit(async (data) => {
    await signIn('google', { callbackUrl: 'http://localhost:3000/home'})
  })
  const signInDiscord = form.handleSubmit(async (data) => {
    await signIn('discord', { callbackUrl: 'http://localhost:3000/home'})
  })
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid w-[400px] p-6">
        <div className="grid gap-2 text-center">
          <a href="" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-5 dark:text-white">
          <img src="logo.png" className="mr-4 h-28 z-10" alt="FlowBite Logo" />
          </a>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <form action={async () => await signInCredentials()} className="space-y-2">
              <Label htmlFor="login">Email</Label>
              <Input
              id="email"
              placeholder=""
              required
              type="email"
              {...form.register('email')}
              />
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
                >
              {form.formState.isSubmitting ? 'Sending...' : 'Send magic link'}
              </Button>
            </form>
          </div>
          <hr />
          <Button className="w-full" variant="outline" type="submit" disabled={form.formState.isSubmitting} onClick={() => signInGoogle()}>
            <div className='w-full flex flex-row justify-start items-center'>
              <FcGoogle className="h-7 w-7"/>
              <span className='w-full'>Login with Google</span>
            </div>
          </Button>
          <Button className="w-full" variant="discord" type="submit" disabled={form.formState.isSubmitting} onClick={() => signInDiscord()}>
            <div className='w-full flex flex-row justify-start items-center'>
              <FaDiscord className="h-7 w-7"/>
              <span className='w-full'>Login with Discord</span>
            </div>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="#" className="text-orange-700">
          Sign up
          </Link>
        </div>
    </div>
  </div>
  )
}
