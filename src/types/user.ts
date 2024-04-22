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
  licenses: UserAirportLicense[];
  aicrafts: UserAircrafts[];
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

export interface UserAirportLicense {
  id: string;
  airportId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  airport: Airport;
}

export interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  timezone: string;
  dst: string;
  tzDatabaseTimeZone: string;
}

export interface UserAircrafts {
  id: string;
  aircraftId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  aircraft: Aircraft;
}

export interface Aircraft {
  id: string;
  model: string;
  icao_code: string;
  iata_code: string;
  manufacturer: string;
}