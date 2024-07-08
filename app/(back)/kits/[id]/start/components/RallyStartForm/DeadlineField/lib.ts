import { entries, evolve, fromEntries, groupBy, join, keys, map, pipe, range, toArray } from '@fxts/core';
import { ap, derive } from '@/lib/utils';
import * as E from '@/lib/either';
import { MAX_RALLY_DEADLINE_DAYS, MIN_RALLY_DEADLINE_DAYS } from '@/lib/constants';
import { addYear, convertMsToDate, diffDates, getDate, addDate, getMonth, getYear, isOlderThan, pad02, dateToArray, now } from '@/lib/date';
import { DeadlinePickerValue, ParsedMonthDate } from './types';

export const isDeadlineValid = (today: Date) => (date: Date) => geMinDeadline(today)(date) && leMaxDeadline(today)(date);
const geMinDeadline = (today: Date) => (date: Date) => convertMsToDate(diffDates(today)(date)) >= MIN_RALLY_DEADLINE_DAYS;
const leMaxDeadline = (today: Date) => (date: Date) => convertMsToDate(diffDates(today)(date)) <= MAX_RALLY_DEADLINE_DAYS;

export const presentDeadline = (date?: Date) => (date === undefined ? '' : pipe(dateToArray(date), map(pad02), join(' - ')) + ' 까지');
export const inputDeadline = (date?: Date) => (date === undefined ? '' : pipe(dateToArray(date), join('-')));
export const convertToDeadline =
  (since: Date) =>
  (picker: DeadlinePickerValue): Date =>
    pipe(picker, getSameYearTargetDate(since), addYearIfOlderThan(since));

const stringifyMonth = (date: Date) => pipe(date, getMonth, String);
const parseMonth = (month: string) => parseInt(month) - 1;
const stringifyDate = (date: Date) => pipe(date, getDate, String);
const stringifyMonthDate = (date: Date) => ({
  month: stringifyMonth(date),
  date: stringifyDate(date),
});
const formatDates = ([k, v]: [string, Date[]]) => [k, pipe(v, map(stringifyDate), toArray)] as const;
const getDurings = (days: number[]) => pipe(days, map(String), toArray);
const getDates = (today: Date) => (days: number[]) => pipe(days, map(addDate), map(ap(today)), toArray);
const getDatesByMonth = (dates: Date[]) => pipe(dates, groupBy(stringifyMonth), entries, map(formatDates), fromEntries);
const getMonths = (datesByMonth: Record<string, string[]>) => pipe(datesByMonth, keys, toArray);
const getDuring = (since: Date) => (until: Date) => pipe(until, diffDates(since), convertMsToDate, String);
export const getDeadlineInfo = () =>
  pipe(
    {},
    derive('today')(now),
    derive('days')(() => toArray(range(MIN_RALLY_DEADLINE_DAYS, MAX_RALLY_DEADLINE_DAYS + 1))),
    derive('durings')(({ days }) => getDurings(days)),
    derive('dates')(({ today, days }) => getDates(today)(days)),
    derive('datesByMonth')(({ dates }) => getDatesByMonth(dates)),
    derive('months')(({ datesByMonth }) => getMonths(datesByMonth)),
  );
const parseTargetDate: (target: DeadlinePickerValue) => ParsedMonthDate = evolve({
  date: parseInt,
  month: parseMonth,
});
const addYearIfOlderThan = (since: Date) => (target: Date) => pipe(target, E.lift(isOlderThan(since)), E.map(addYear(1)), E.pop);
const dateFromMonthDate =
  (year: number) =>
  ({ month, date }: ParsedMonthDate) =>
    new Date(year, month, date);
const getSameYearTargetDate = (since: Date) => (rawTarget: DeadlinePickerValue) =>
  pipe(rawTarget, parseTargetDate, dateFromMonthDate(getYear(since)));
const syncDuring = (since: Date) => (until: DeadlinePickerValue) =>
  pipe(until, getSameYearTargetDate(since), addYearIfOlderThan(since), getDuring(since));

const syncMonthDate =
  (since: Date) =>
  ({ during }: DeadlinePickerValue) =>
    pipe(during, Number, addDate, ap(since), stringifyMonthDate);
const updateMonthDate = (since: Date) => (unSynced: DeadlinePickerValue) => ({ ...unSynced, ...syncMonthDate(since)(unSynced) });
const updateDuring = (since: Date) => (unSynced: DeadlinePickerValue) => ({ ...unSynced, during: syncDuring(since)(unSynced) });
const isDuringUpdated = (prev: DeadlinePickerValue) => (unSynced: DeadlinePickerValue) => prev.during === unSynced.during;

export const syncPickerValue = (since: Date) => (unSynced: DeadlinePickerValue) => (prev: DeadlinePickerValue) =>
  pipe(unSynced, E.lift(isDuringUpdated(prev)), E.match(updateMonthDate(since), updateDuring(since)));
