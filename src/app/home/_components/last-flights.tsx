'use server'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link, PlaneTakeoff } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
import { lastFlights } from "../(main)/types"
import { getUserLastFlights } from "../(main)/actions"


export async function LastFlightCard() {
    const data: lastFlights[] = await getUserLastFlights();
    const statusColors = {
      1: 'bg-green-700 text-white',
      2: 'bg-yellow-700 text-white',
      3: 'bg-red-700 text-white',
      4: 'bg-blue-700 text-white',
    };

    const getStatusText = (status: number) => {
        switch (status) {
          case 1:
            return 'Finished';
          case 2:
            return 'Pending';
          case 3:
            return 'Canceled';
          case 4:
            return 'In progress';
          default:
            return 'Unknown Status';
        }
      };

    return (
        <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle className="flex flex-row items-center">Last flights<PlaneTakeoff className="ml-3 h-4 w-4 text-muted-foreground" /></CardTitle>
            <CardDescription>
            See details of your most recent flights
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Partida</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Aeronave</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {data.map((e) => (
                <TableRow>
                    <TableCell>
                        <div className="font-medium">{e.flight_uuid}</div>
                    </TableCell>
                    <TableCell>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {e.arrival.icao_code}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {e.departure.icao_code}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {e.aircraft.model}
                        </div>
                    </TableCell>
                    <TableCell className="text-end">
                    <Badge className={`text-md ${statusColors[e.status as keyof typeof statusColors]} hover:${statusColors[e.status as keyof typeof statusColors]}`}>
                        {getStatusText(e.status)}
                    </Badge>
                    </TableCell>
                </TableRow> 
            ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    )
}