import { map, pipe, join } from '@fxts/core';
import { DATE_TO_MS } from './constants';
import { ap } from './utils';

export const pad02 = (num: number) => num.toString().padStart(2, '0');
export const displayDateYyMmDd = (date: Date) => pipe(date, getDateNumbers, map(pad02), join('.'));
export const getDateNumbers = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()];
export const convertMsToDate = (ms: number) => Math.ceil(ms / DATE_TO_MS);
export const now = () => new Date();
export const diffDates = (date1: Date) => (date2: Date) => Math.abs(date1.getTime() - date2.getTime());

export const parseDate = (a: number | string | Date) => new Date(a);
export const parseNullableDate = (a: number | string | Date | null) => (a ? parseDate(a) : null);

export const getYear = (date: Date) => date.getFullYear();
export const getMonth = (date: Date) => date.getMonth() + 1;
export const getDate = (date: Date) => date.getDate();
export const dateToArray = (date: Date) => pipe([getYear, getMonth, getDate], map(ap(date)));
export const addDate = (days: number) => (since: Date) => new Date(since.getTime() + days * DATE_TO_MS);
export const getLastDayOfMonth = (date: Date) => getDate(new Date(getYear(date), getMonth(date), 0));
export const isOlderThan = (a: Date) => (b: Date) => a.getTime() > b.getTime();
export const isNewerThan = (a: Date) => (b: Date) => a.getTime() < b.getTime();
export const addYear = (add: number) => (date: Date) => new Date(date.getFullYear() + add, date.getMonth(), date.getDate());
export const curryDate = (year: number) => (month: number) => (date: number) => new Date(year, month, date);
