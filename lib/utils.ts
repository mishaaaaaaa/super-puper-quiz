import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const storage = {
  setItem: (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  getItem: <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      const result = window.localStorage.getItem(key);
      return result ? (JSON.parse(result) as T) : null;
    }
    return null;
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};
