import { DATE_TO_MS } from './constants';

export const dateIntl = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'short' });
export const getMsToDate = (ms: number) => Math.floor(ms / DATE_TO_MS);
