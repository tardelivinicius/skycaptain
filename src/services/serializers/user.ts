import { User } from "@/types/user"

export interface SerializedUser {
  id: string;
  username: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

export function UserSerializer(user: User | null): SerializedUser {
  return {
    id: user?.id,
    username: user?.username ?? null,
    name: user?.name ?? null,
    email: user?.email ?? null,
    image: user?.image ?? null,
  };
}

interface SerializerOverViewUser {
  qty_airports: number;
  qty_aircrafts: number;
  currency: string | undefined
}

export function UserOverviewSerializer(user: User | null): SerializerOverViewUser {
  return {
    qty_airports: user?._count.airports ?? 0,
    qty_aircrafts: user?._count.aircrafts ?? 0,
    currency: user?.preference?.currency
  };
}
