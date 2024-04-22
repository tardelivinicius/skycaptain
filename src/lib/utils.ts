import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Radius of the Earth in km
  const R = 6371.0;

  // Convert degrees to radians
  const lat1_rad = lat1 * (Math.PI / 180);
  const lon1_rad = lon1 * (Math.PI / 180);
  const lat2_rad = lat2 * (Math.PI / 180);
  const lon2_rad = lon2 * (Math.PI / 180);

  // Difference in coordinates
  const dlat = lat2_rad - lat1_rad;
  const dlon = lon2_rad - lon1_rad;

  // Haversine formula
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;

  return Math.round(distance * 100) / 100;
}