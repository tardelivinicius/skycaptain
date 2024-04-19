import { User } from "@/types/user"
import { Session } from "next-auth";

export interface SerializedUser {
  id: string;
  username: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

export function UserSerializer(user: User | null): SerializedUser {
  return {
    id: user?.id ?? '',
    username: user?.username ?? null,
    name: user?.name ?? null,
    email: user?.email ?? null,
    image: user?.image ?? null,
  };
}

interface SerializerOverViewUser {
  qtyAirports: number;
  qtyAircrafts: number;
  currency: string | undefined
  flightsCompleted: number
  totalEarned: number
}

export function UserOverviewSerializer(user: Session['user'] | null): SerializerOverViewUser {
  return {
    qtyAirports: (user?._count.licenses ?? 0) + (user?._count.airports ?? 0),
    qtyAircrafts: user?._count.aircrafts ?? 0,
    currency: user?.preference?.currency,
    flightsCompleted: 0,
    totalEarned: 0.00
  };
}
