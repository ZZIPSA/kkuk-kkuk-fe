import { DATE_TO_MS } from './constants';

const pad02 = (num: number) => num.toString().padStart(2, '0');
export const displayDateYyMmDd = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(pad02).join('.');
export const convertMsToDate = (ms: number) => Math.floor(ms / DATE_TO_MS);
