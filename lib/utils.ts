import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DOMAIN } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDomain(path: string) {
  return DOMAIN + path.startsWith('/') ? path : `/${path}`;
}
