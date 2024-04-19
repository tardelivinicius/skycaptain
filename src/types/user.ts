import { Airport } from "@prisma/client";

export interface User {
  id: string;
  username?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  preferenceId?: number | null;
  levelId?: number | null;
  isFirstAccess?: boolean;
  level: Level | null;
  preference: UserPreference | null;
  _count: { 
    aircrafts: number;
    airports: number;
    licenses: number;
  };
  nextLevel: Level | null;
}

export interface Level {
  id: number;
  title: string;
  order: number;
  totalXP: number;
  multiplierFactor: number;
  isActive: boolean;
  color: string;
}

export interface UserPreference {
  currency: string;
  weight: string;
  countryCode: string;
}