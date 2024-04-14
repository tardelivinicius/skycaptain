import { FaUserPlus } from 'react-icons/fa'
import { MdFlightTakeoff } from "react-icons/md";
import { TbRouteX } from "react-icons/tb";

export function About() {
    return (
      <div className="flex py-4 px-4 col-span-2">
        <div className="flex flex-col max-w-[800px] space-y-8">
          <h1 className="text-4xl font-extrabold xl:text-5xl/none mt-2 dark:text-black">
            Welcome to Skycaptain
          </h1>
          <div>
          <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">Your Journey Begins Here! </h3>
            <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
              Have you ever dreamed of soaring through the skies like a true captain? Get ready to turn your dreams into reality with SkyCaptain! Whether you're a novice in search of adventure or an experienced pilot looking for exciting challenges, SkyCaptain is your gateway to an exhilarating career in the virtual world of flight simulation.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight flex flex-row items-top">
              <FaUserPlus className="mr-3 h-5 w-5"/>
              Create Your Pilot Career
            </h3>
            <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                Craft your pilot career from scratch. Begin by creating your account and establishing your own airline. Unlock airports, aircraft, and rise through the ranks by earning experience and reaching milestones. As you progress, collect medals to showcase your achievements and become the ultimate captain of the skies.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">
              <TbRouteX className="mr-3 h-5 w-5"/>
              Manage your routes
            </h3>
            <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
                Effective route management is key to success. Upon registration, you'll receive 10 initial routes and one aircraft to kickstart your journey. Navigate through short regional flights and long-haul journeys worldwide, optimizing your routes for efficiency and profitability. Master route management to expand your airline and thrive in the competitive aviation industry.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight flex flex-row items-center">
              Get Ready to Take Off 
              <MdFlightTakeoff className="ml-3 h-5 w-5"/>
            </h3>
            <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed dark:text-gray-400">
              Prepare for an unforgettable adventure. Log in now and commence your journey. The sky's the limit - and you're in command.
            </p>
          </div>
        </div>
      </div>
    )
}