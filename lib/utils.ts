import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatCurrency(amount: number, currencyCode: string | undefined): string {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode?.toUpperCase(),
    }).format(amount)

  } catch (error) {
    console.error("Error formatting currency:", currencyCode, error)
    return `${currencyCode?.toUpperCase()} ${amount.toFixed(2)}`
  }
}
