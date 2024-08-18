import { notFound } from 'next/navigation';
import { lift, purify } from './either';

const isOk = (res: Response) => res.ok;
export const validResponse = lift(isOk);
export const validOrNotFound = (res: Response) => purify<Response, Response>(notFound)(lift(isOk)(res));
export const resolveText = (res: Response | Request) => res.text();
export const resolveJson = <T>(res: Response | Request): Promise<T> => res.json();
export const resolveData = <T>(res: Response | Request) => res.json().then(({ data }) => data as T);
export const fetchDataOrNotFound = <T>(...props: Parameters<typeof fetch>) =>
  fetch(...props)
    .then(validOrNotFound)
    .then(resolveData<T>);
