/** 
 * @file 
 * @description A utility function to combine and merge Tailwind CSS class names. 
 * It uses clsx for conditionally combining classes and tailwind-merge to merge conflicting Tailwind CSS classes.
 */

import { clsx, type ClassValue } from "clsx"; // Importing clsx for conditionally joining class names
import { twMerge } from "tailwind-merge"; // Importing twMerge for merging Tailwind class names while resolving conflicts

// Utility function to combine and merge class names
export function cn(...inputs: ClassValue[]) {
  // Combine class names using clsx and resolve conflicts with tailwind-merge
  return twMerge(clsx(inputs)); 
}
