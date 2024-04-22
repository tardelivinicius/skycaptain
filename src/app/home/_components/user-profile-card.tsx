import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Session } from "next-auth"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
type UserProps = {
  user: Session['user'] | undefined
}
export default function UserProfileCard({ user }: UserProps) {
  const colorClass = `overflow-hidden bg-${user?.level?.color}`;
  return (
    <Card className={colorClass} x-chunk="dashboard-05-chunk-4">
              <div className="bg-bronze bg-silver bg-black bg-diamond bg-gold"></div>
              <CardHeader className="flex flex-row text-sm items-center border-t bg-muted/50 px-3 py-2 bg-black">
                License Card
              </CardHeader>
              <CardFooter className="flex flex-col items-start border-t bg-muted/50 px-6 py-3">
                <div className="w-full flex flex-row justify-between">
                <div className="flex flex-col"> 
                  <span className="text-2xl">{user?.username}</span>
                  <span className="text-sm">{user?.level?.title}</span>
                  <div className="text-xs text-muted-foreground">
                    Member since <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                </div>
                <Button variant="secondary" size="icon" className="rounded-full w-14 h-14 bg-muted/50">
                  <Avatar className="w-12 h-12">
                      <AvatarImage src={user?.image as string} alt={user?.name as string} />
                      <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                </Button>
                </div>
                <Separator className="my-4" />
                <dl className="grid gap-3 w-full">
                      <Progress value={0} max={user?.nextLevel?.totalXP} />
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1">
                        {user?.level?.title}
                      </dt>
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        0 / {user?.nextLevel?.totalXP}
                      </dt>
                      <dt className="flex items-center gap-1">
                        {user?.nextLevel?.title}
                      </dt>
                    </div>
                  </dl>                
              </CardFooter>
            </Card>
  )
}