'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { FaUserPlus, FaApple, FaDiscord} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { MdFlightTakeoff } from "react-icons/md";
import { TbRouteX } from "react-icons/tb";


export default function Home() {
  const form = useForm()
  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
  })
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px] h-screen">
      <div className="hidden bg-muted lg:block col-span-2 relative">
        <img src="background1.png" className="h-full w-full object-cover dark:brightness-[0.6] dark:grayscale shadow bg-green-500" />
        <div className="absolute top-6 left-14 w-[1100px]">
        <section className="w-full py-12 md:py-24">
          <div className="container grid gap-6 px-4 md:px-6 lg:gap-10">
            <div className="">
            <div className="grid items-start justify-start md:grid-cols-1 md:gap-8">
              <div className="space-y-2 bg-white rounded-lg p-4 shadow-lg dark:brightness-[0.6] dark:grayscale">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl/none">
              Welcome to Skycaptain
            </h1>
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">Your Journey Begins Here! </h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                Have you ever dreamed of soaring through the skies like a true captain? Get ready to turn your dreams into reality with SkyCaptain! Whether you're a novice in search of adventure or an experienced pilot looking for exciting challenges, SkyCaptain is your gateway to an exhilarating career in the virtual world of flight simulation.
                </p>
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">What is SkyCaptain?</h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                  SkyCaptain is more than just a game - it's a revolutionary flight simulation platform that puts you in control. Developed by aviation enthusiasts and passionate gamers, SkyCaptain offers an immersive and authentic experience that transports you to the skies like never before.
                </p>
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">Create Your Pilot Career</h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                  With SkyCaptain, you have the freedom to create and customize your own pilot career. From short regional flights to long-haul journeys around the world, the possibilities are endless. Earn experience, unlock new aircraft, achieve milestones, and climb the ranks to become the ultimate captain of the skies.
                </p>
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">Get Ready to Take Off!</h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                  Are you ready to take off on an unforgettable journey? Log in now and start your adventure with SkyCaptain. The sky's the limit - and with SkyCaptain, you're in command.
                </p>
                <div className="bg-orange-600 rounded-md p-0.5 w-full"></div>
              </div>
            </div>
            </div>
            <div className="grid items-start justify-start gap-6 md:grid-cols-3 md:gap-8">
              <div className="space-y-2 bg-white rounded-md p-2 shadow-lg dark:brightness-[0.6] dark:grayscale">
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center"><FaUserPlus className="mr-3 h-5 w-5"/> Sign up and create your Company </h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                  Register to begin your journey. Upon creating your account, you'll gain initial access to a selection of airports and aircraft to start your flights.
                </p>
                <div className="bg-orange-600 rounded-md p-0.5 w-full"></div>
              </div>
              <div className="space-y-2 bg-white rounded-md p-2 shadow-lg dark:brightness-[0.6] dark:grayscale">
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center"><TbRouteX className="mr-3 h-5 w-5"/> Customize</h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                  Explore our wide selection of aircraft and airports worldwide. Personalize your fleet and plan your routes for exciting flights.
                </p>
                <div className="bg-orange-500 p-0.5 w-full"></div>
              </div>
              <div className="space-y-2 bg-white rounded-md p-2 shadow-lg dark:brightness-[0.6] dark:grayscale">
                <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">Explore <MdFlightTakeoff className="ml-2 h-5 w-5"/></h3>
                <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                  Take control and soar through the skies! Complete challenging missions, unlock achievements, and earn rewards along the way.
                </p>
                <div className="bg-orange-500 p-0.5 w-full"></div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[400px] p-8 border rounded-lg">
          <div className="grid gap-2 text-center">
            <a href="" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-5 dark:text-white">
            <img src="logo.png" className="mr-4 h-28 z-10" alt="FlowBite Logo" />
            </a>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <form onSubmit={handleSubmit} className="space-y-2">
                <Label htmlFor="email">Username or email</Label>
                <Input
                id="email"
                placeholder=""
                required
                type="email"
                {...form.register('email')}
                />
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                    </Link>
                  </div>
                  <Input
                  id="password"
                  placeholder=""
                  required
                  type="password"
                  {...form.register('password')}
                  />
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  >
                {form.formState.isSubmitting ? 'Sending...' : 'Login'}
                </Button>
              </form>
            </div>
            <hr />
            {/* Google */}
            <Button className="w-full" variant="outline" type="submit" disabled={form.formState.isSubmitting}>
              <div className='w-full flex flex-row justify-start items-center'>
                <FcGoogle className="h-7 w-7"/>
                <span className='w-full'>Login with Google</span>
              </div>
            </Button>
            {/* Apple */}
            <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
              <div className='w-full flex flex-row justify-start items-center'>
                <FaApple className="h-7 w-7"/>
                <span className='w-full'>Login with Apple</span>
              </div>
            </Button>
            {/* Discord */}
            <Button className="w-full" variant="discord" type="submit" disabled={form.formState.isSubmitting}>
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
    </div>
  )
}