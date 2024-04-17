'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Plane, PlaneLanding, Users, Warehouse } from "lucide-react";
import { getCurrencytype } from "@/lib/get-currency-type";
import { UserPreference } from "../(main)/types";
import { MdTravelExplore } from "react-icons/md";


type UserPreferences = {
  data: UserPreference
}

export function OverviewCards({ data }: UserPreferences) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Aircrafts
          </CardTitle>
          <Plane className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10</div>
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
          <div className="text-2xl font-bold">42</div>
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
          <div className="text-2xl font-bold">12,234</div>
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
          <div className="text-2xl font-bold">{getCurrencytype(data?.currency)} 930.000,00</div>
          <p className="text-xs text-muted-foreground">
            +19% since last month
          </p>
        </CardContent>
      </Card>
    </div>
    )
}