'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { saveUserPreferences } from "../(main)/actions"
import { redirect, useRouter } from "next/navigation"

const FormSchema = z.object({
  currency: z.string({
      required_error: "Please select an currency to display.",
    }),
  weight: z.string({
      required_error: "Please select an weight to display.",
    }),
})

export function UpdatePreferences({ openDialog }: { openDialog: boolean }) {
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await saveUserPreferences({ data: { currency: data.currency, weight: data.weight } })
    .then((e => {
      toast({
        title: "Preferences updated!",
        variant: "success"
      })
      router.push('/home');
    }))
    .catch(e =>{
      console.log(e)
    });
  }
  return (
    <div>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]" hideCloseButton={true}>
          <DialogHeader>
            <DialogTitle>Preferences</DialogTitle>
            <DialogDescription>
              Set your preferences to maximize your experience.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dolar">USD</SelectItem>
                        <SelectItem value="euro">EUR</SelectItem>
                        <SelectItem value="real">BRL</SelectItem>
                        <SelectItem value="pound">GBP</SelectItem>
                        <SelectItem value="iene">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a weight" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pound">LB</SelectItem>
                        <SelectItem value="kilo">KG</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage the preferences any time in your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}