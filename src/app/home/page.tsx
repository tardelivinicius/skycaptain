import { auth } from '@/services/auth'

export default async function Home() {
    const session = await auth()
    return(
        <div>
        <h1>oi vc está na home! { session?.user?.email }</h1>
        </div>
    )
}