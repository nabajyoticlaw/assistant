import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * This utility allows you to conditionally apply Tailwind classes
 * and merge them correctly to prevent CSS conflicts.
 * Example: cn("text-red-500", isError && "bg-red-100")
 */
export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}
