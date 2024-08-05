import { lift } from './either';

const isOk = (res: Response) => res.ok;
export const validResponse = lift(isOk);
export const resolveText = (res: Response) => res.text();
export const resolveJson = <T>(res: Response): Promise<T> => res.json();
export const resolveData = <T>(res: Response) => res.json().then((data) => data as T);
