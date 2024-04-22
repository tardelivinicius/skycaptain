import * as React from "react"
import { auth } from "@/services/auth"
import Header from "../_components/header"
import { OverviewCards } from "../_components/overview-cards"
import UserProfileCard from "../_components/user-profile-card"
import { LastFlightCard } from "../_components/last-flights"
import LastUsersActivities from "../_components/last-activities"

export default async function Dashboard() {
  const session = await auth()
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <OverviewCards user={session?.user} />
            <LastFlightCard />
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <UserProfileCard user={session?.user}/>
            <LastUsersActivities />
          </div>
        </main>
      </div>
    </div>
  )
}