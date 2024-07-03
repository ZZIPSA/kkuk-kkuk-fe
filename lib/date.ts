import { curry, map, pipe, join } from '@fxts/core';
import { DATE_TO_MS } from './constants';

const pad02 = (num: number) => num.toString().padStart(2, '0');
export const displayDateYyMmDd = (date: Date) => pipe(date, getDateNumbers, map(pad02), join('.'));
export const getDateNumbers = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()];
export const convertMsToDate = (ms: number) => Math.floor(ms / DATE_TO_MS);
export const now = () => new Date();
export const diffDates = (date1: Date) => (date2: Date) => Math.abs(date1.getTime() - date2.getTime());
