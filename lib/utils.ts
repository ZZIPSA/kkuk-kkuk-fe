import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DOMAIN } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDomain(path: string) {
  const domain = DOMAIN ?? window.location.origin;
  return `${domain}${path.startsWith('/') ? path : `/${path}`}`;
}
export const addPx = (num: number) => `${num}px`;

export const joinSlash = (a: string) => (b: string) => `${a}/${b}`;
