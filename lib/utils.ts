import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DOMAIN } from './constants';
import { tap } from '@fxts/core';

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

export const tapLog = <T, U>(tag: string) => tap<T, U>((e) => console.log(tag, e) as any);
export const parseDate = (a: number | string | Date) => new Date(a);

/**
 * a -> b -> a & b
 */
export const assign =
  <T>(a: T) =>
  <S>(b: S) =>
    Object.assign({}, a, b);
/**
 * k -> v -> o -> o & { k: v }
 */
export const set =
  <K extends PropertyKey>(key: K) =>
  <T>(value: T) =>
  <S>(obj: S) =>
    assign(obj)({ [key]: value }) as { [P in K | keyof S]: P extends K ? T : P extends keyof S ? S[P] : never };
/**
 * f -> a -> f(a)
 */
export const ap =
  <T, R>(fn: (a: T) => R) =>
  (a: T) =>
    fn(a);
/**
 * f -> () -> f()
 */
export const execute = <T>(fn: () => T) => fn();
/**
 * k[] -> o -> { k: o[k] }
 */
export const remain =
  <K extends string, P extends K>(props: P[]) =>
  <T extends { [P in K]: T[P] }>(obj: T) =>
    Object.fromEntries((Object.entries(obj) as [P, T[P]][]).filter(([key]) => props.includes(key))) as {
      [Q in P]: T[Q];
    };
/**
 * k -> f -> o -> o & { k: f(o) }
 */
export const derive =
  <K extends PropertyKey>(key: K) =>
  <T, R>(fn: (props: T) => R) =>
  (obj: T) =>
    set(key)(fn(obj))(obj);
