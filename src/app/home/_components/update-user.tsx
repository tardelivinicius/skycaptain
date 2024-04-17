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
import { checkUsernameAvailability, saveUserData } from "../(main)/actions"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"


export function UpdatePreferences({ openDialog, setOpenDialog}: { openDialog: boolean, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [inputValue, setInputValue] = useState('');
  const timerDuration = 1000; // Tempo em milissegundos
  const [checkUsername, setcheckUsername] = useState(true)
  let timer : any;
  const { toast } = useToast()

  const FormSchema = z.object({
    username: z.string({
      required_error: "Please insert a valid username"
    })
    .min(4)
    .max(15)
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value ?? ""), 'Name should contain only alphabets and numbers')
    .refine((username) => {
      if(username.length >= 4) {
        handleChange(username)
        return checkUsername
      }
      return true
    }, "Username already exists"),
    currency: z.string({
      required_error: "Please select an currency to display.",
    }),
    weight: z.string({
      required_error: "Please select an weight to display.",
    }),
  })

  const usernameSchema = z.string().min(4);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "all"
  })

  const handleChange = (username: string) => {
    if (username !== inputValue) {
      setInputValue(username);
    }
  };

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log('Tempo esgotado. Verificando disponibilidade do nome de usuário...');
      const check = await checkUsernameAvailability(inputValue);
      setcheckUsername(!check)
    }, timerDuration);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
   form.trigger('username');
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await saveUserData({ data: { username: data.username, currency: data.currency, weight: data.weight } })
    .then((e => {
      toast({
        title: "Preferences updated!",
        variant: "success"
      })
      setOpenDialog(false)
    }))
    .catch(e =>{
      console.log(e)
    });
  }

  const handleCurrencyChange = () => {
    form.trigger('username');
  };


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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="Choose a nickname" defaultValue={field.value} onBlur={field.onBlur} onChange={field.onChange} />
                    <FormMessage />
                    <FormDescription>
                      Nicknames can be changed once a month. Unlimited changes are available for <Link href="#" className="text-orange-500 underline">premium</Link> users only.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem onBlur={handleCurrencyChange}>
                    <Select onValueChange={field.onChange} defaultValue={field.value} onOpenChange={handleCurrencyChange}>
                      <FormControl onSelect={handleCurrencyChange}>
                      <SelectTrigger onBlur={field.onBlur}>
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
                  <FormItem onBlur={handleCurrencyChange}>
                    <Select onValueChange={field.onChange} defaultValue={field.value} onOpenChange={handleCurrencyChange}>
                      <FormControl onSelect={handleCurrencyChange}>
                      <SelectTrigger onBlur={field.onBlur}>
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