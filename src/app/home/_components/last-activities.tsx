import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export default function LastUsersActivities() {
    return (
        <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
          <CardTitle>Last users activities</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                malaquias09
              </p>
              <p className="text-sm text-muted-foreground">
                SBGR - SBKP
              </p>
            </div>
            <div className="ml-auto font-medium">
            <Badge className="bg-orange-500 text-white">In progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}