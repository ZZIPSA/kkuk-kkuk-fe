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
export const convertResponseToArrayBuffer = (res: Response) => res.arrayBuffer();
export const convertBufferToBase64 = (buffer: Buffer | ArrayBuffer) => buffer.toString('base64');
export const addBase64Prefix = (base64: string) => `data:image/png;base64,${base64}` as const;
