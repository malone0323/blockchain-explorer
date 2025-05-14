import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistanceToNow(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  // Convert milliseconds to seconds
  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""}`
  }

  // Convert to minutes
  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""}`
  }

  // Convert to hours
  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`
  }

  // Convert to days
  const days = Math.floor(hours / 24)

  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""}`
  }

  // Convert to months
  const months = Math.floor(days / 30)

  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""}`
  }

  // Convert to years
  const years = Math.floor(months / 12)

  return `${years} year${years !== 1 ? "s" : ""}`
}
