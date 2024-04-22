'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Plane, PlaneLanding, Subscript, SubscriptIcon, Warehouse } from "lucide-react";
import { getCurrencytype } from "@/lib/get-currency-type";
import { UserOverviewSerializer } from '@/api/serializers/user'
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { TbPremiumRights } from "react-icons/tb";
import { useState } from "react";
import UpsertFlight from "./upsert-flight";

type UserProps = {
  user: Session['user'] | undefined
}

export function OverviewCards({ user }: UserProps) {
  if(!user) return
  const [openSheet, setOpenSheet] = useState(false)
  const data = UserOverviewSerializer(user)
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
    <UpsertFlight openSheet={openSheet} setOpenSheet={setOpenSheet} user={user} />
    <Card className="sm:col-span-3" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="">
        <CardTitle>Create flights with ease</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing our new flight creation feature. 
          Our motive is to provide a seamless flight booking experience.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={() => setOpenSheet(true)}>Create New Flight</Button>
      </CardFooter>
    </Card>
    <Card x-chunk="dashboard-01-chunk-0">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">
      Premium Plan
    </CardTitle>
    <TbPremiumRights className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground mt-2">
      Upgrade to our <Link href="/home/premium" className="text-orange-500 underline font-bold">Premium Plan</Link> for unlimited flight access. 
    </p>
  </CardContent>
  <CardFooter className="flex flex-col">
    <Progress className="rounded-sm w-full" value={data.flightsCompleted} max={5} />
    <div className="flex flex-row w-full justify-between">
      <span className="text-xs mt-1">Flights per month</span>
      <span className="text-xs mt-1">0/10</span>
    </div>
  </CardFooter>
</Card>
    <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Aircrafts
          </CardTitle>
          <Plane className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.qtyAircrafts}</div>
          <p className="text-xs text-muted-foreground">
            +1 from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-centxer justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Airports
          </CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.qtyAirports}</div>
          <p className="text-xs text-muted-foreground">
            +18 from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flights completeds</CardTitle>
          <PlaneLanding className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.flightsCompleted}</div>
          <p className="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total earned</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getCurrencytype(data.currency)} {data.totalEarned}</div>
          <p className="text-xs text-muted-foreground">
            +19% since last month
          </p>
        </CardContent>
      </Card>
  </div>
    )
}