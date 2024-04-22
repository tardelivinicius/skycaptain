'use client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { haversine } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getCurrencytype } from "@/lib/get-currency-type"
import { random } from "lodash"
import { saveUserFlight } from "../(main)/actions"
import { toast } from "@/components/ui/use-toast"

type UserProps = {
  user: User | undefined
}

const FormSchema = z.object({
  flight_code: z.string({
    required_error: "Flight code is required",
  }),
  departure: z.string({
    required_error: "Departure is required",
  }),
  arrival: z.string({
    required_error: "Departure is required",
  }),
  aircraft: z.string({
    required_error: "Aircraft is required",
  }),
})

export default function UpsertFlight({ user, openSheet, setOpenSheet }: UserProps ) {
  const [distance, setDistance] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [payment, setPayment] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "all"
  })

  const departureAirportCode = form.watch('departure');
  const arrivalAirportCode = form.watch('arrival');
  const aircraft = form.watch('aircraft');

  const departureAirport = user?.licenses.find(e => e.airport.icao_code === departureAirportCode);
  const arrivalAirport = user?.licenses.find(e => e.airport.icao_code === arrivalAirportCode);
  const selectedAircraft = user?.aicrafts.find(e => e.aircraft.icao_code === aircraft);

  useEffect(() => {
    const distance = haversine(
      departureAirport?.airport.lat ?? 0, 
      departureAirport?.airport.lng ?? 0, 
      arrivalAirport?.airport.lat ?? 0, 
      arrivalAirport?.airport.lng ?? 0
    );
    setDistance(Math.floor(distance))
    setXp(parseFloat(Math.floor(distance / 2).toFixed(2)))
    // @TODO - Criar metodo de acordo com o nivel para definir os passageiros
    setPassengers(Math.floor(random(90, 174)))
    setPayment(parseFloat((distance * (user?.level?.multiplierFactor ?? 1)).toFixed(2)))
  }, [departureAirport && arrivalAirport]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await saveUserFlight({
      data: {
        ...data,
        distance,
        passengers,
        xp,
        payment,
        departureAirport,
        arrivalAirport,
        selectedAircraft
      }
    })
    .then(() => {
      toast({
        title: "Flight created!",
        variant: "success"
      })
      setOpenSheet(false)
    })
    .catch(e =>{
      console.log(e)
    });
  }

  
return (
  <Sheet open={openSheet}>
    <SheetContent>
      <div className="flex flex-row items-start justify-between">
        <SheetTitle>Create a new flight</SheetTitle>
        <SheetClose onClick={() => setOpenSheet(false)}>x</SheetClose>
      </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="flight_code"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="space-y-2 flex flex-col border rounded-md bg-muted/50 px-2 my-2">
                  <span className="mt-2">To create a new flight, <span className="text-orange-500">follow these steps:</span></span>
                  <span className="mb-2"><span className="text-orange-500">1.</span> Enter a unique flight code of your choice for identification.</span>
                  <span className="mb-2"><span className="text-orange-500">2.</span> Select a departure airport and a destination airport from the options available in your licenses.</span>
                  <span className="mb-2"><span className="text-orange-500">3.</span> Choose the aircraft for the flight.</span>
                  <span>After entering this information, you'll see a summary below with details about the rewards you can earn from this flight.</span>
                </FormDescription>
                  <Input placeholder="Choose flight Code" defaultValue={field.value} onBlur={field.onBlur} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departure"
              render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a departure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user?.licenses.map((e, index) => (
                      <SelectItem key={index} value={e.airport.icao_code}>{e.airport.icao_code} - {e.airport.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrival"
              render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a arrival" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {user?.licenses.map((e, index) => (
                    e.airport.icao_code !== departureAirportCode ? (
                      <SelectItem key={index} value={e.airport.icao_code}>
                        {e.airport.icao_code} - {e.airport.name}
                      </SelectItem>
                    ) : null
                  ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aircraft"
              render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a aircraft" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {user?.aicrafts.map((e, index) => (
                    <SelectItem key={index} value={e.aircraft.icao_code}>
                      {e.aircraft.icao_code} - {e.aircraft.model}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              )}
            />
          {/* <Separator /> */}
          <Card>
            <div className="space-y-2 p-4">
              <h4><span className="text-orange-500">{form.watch('flight_code')}</span> Flight Summary</h4>
              <div className="flex flex-row justify-between text-xs">
                <span>Departure</span>
                <span className="text-orange-500">{form.watch('departure')}</span>
              </div>
              <div className="flex flex-row justify-between text-xs">
                <span>Arrival</span>
                <span className="text-orange-500">{form.watch('arrival')}</span>
              </div>
              <div className="flex flex-row justify-between text-xs">
                <span>Passengers</span>
                <span>{passengers}</span>
              </div>
              <div className="flex flex-row justify-between text-xs">
                <span>Distance</span>
                <span>{distance} km</span>
              </div>
              <div className="flex flex-row justify-between text-xs">
                <span>XP Guaranted</span>
                <span>{xp}</span>
              </div>
              <div className="flex flex-row justify-between text-xs">
                <span>Total earned</span>
                <span>{getCurrencytype(user?.preference?.currency)} {payment}</span>
              </div>
            </div>
          </Card>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
    </SheetContent>
  </Sheet>
  )
}