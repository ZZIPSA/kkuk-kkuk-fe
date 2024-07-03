import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DOMAIN } from './constants';
import { negate, tap } from '@fxts/core';

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

export const everyTrue =
  <T>(...fns: ((e: T) => boolean)[]) =>
  (e: T) =>
    fns.every(ap(e));
export const everyEq =
  <T, R>(...fns: ((e: T) => R)[]) =>
  (e: T) =>
    fns.map(ap(e)).every(eq(ap(e)(fns[0])));

export const eq = (a: unknown) => (b: unknown) => a === b;
export const isNull = eq(null);
export const notNull = negate(isNull);

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
  <T>(a: T) =>
  <R>(fn: (a: T) => R) =>
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
