import { clsx, type ClassValue } from 'clsx';

export default function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
