import type { GET } from '@/app/api/rallies/[id]/route';
import { every, evolve, isNull, juxt, pipe, prop } from '@fxts/core';
import { constNull } from '@/lib/always';
import { API_URL } from '@/lib/constants';
import { convertMsToDate, displayDateYyMmDd, now, diffDates, parseDate, parseNullableDate } from '@/lib/date';
import { lift, match } from '@/lib/either';
import { fetchDataOrNotFound } from '@/lib/response';
import { eq, derive, remain, everyTrue, notNull } from '@/lib/utils';
import { FetchedRallyData, FetchRallyData, RallyStatus } from '@/types/Rally';

/**
 * {@link GET API}
 */
export const getRallyData = async (id: string) =>
  pipe(
    id,
    getRallyApiUrl, // API URL + ID
    fetchDataOrNotFound<FetchedRallyData>, // API 호출로 데이터 가져오기
    parseRallyDates, // 날짜 데이터 파싱
  );
const getRallyApiUrl = (id: string): string => `${API_URL}/api/rallies/${id}`;
const parseRallyDates: (fetched: FetchedRallyData) => FetchRallyData = evolve({
  createdAt: parseDate,
  updatedAt: parseDate,
  dueDate: parseNullableDate,
  lastStampDate: parseNullableDate,
  completionDate: parseNullableDate,
  extendedDueDate: parseNullableDate,
  kit: evolve({
    deletedAt: parseNullableDate,
  }),
});

interface GetRallyInfoProps extends Pick<FetchRallyData, 'status' | 'completionDate' | 'extendedDueDate'> {
  stamps: FetchRallyData['kit']['stamps'];
  starterId: FetchRallyData['starter']['id'];
  kitDeletedAt: FetchRallyData['kit']['deletedAt'];
  viewerId?: string;
}
export const getRallyInfo = (data: GetRallyInfoProps) =>
  pipe(
    data,
    derive('owned')(({ starterId, viewerId }) => starterId === viewerId), // starterId와 viewerId가 같은지로 소유 여부 확인
    derive('total')(({ stamps }) => stamps.length), // 전체 스탬프 개수
    derive('failed')(isFailed), // 실패 여부
    derive('extendable')(isNeverExtendedBefore), // 연장 가능 여부
    derive('startable')(isKitExist), // 시작 가능 여부
    remain(['owned', 'total', 'failed', 'extendable', 'startable'] as const), // 필요한 값만 남기기
  );
const isFailed = <T extends GetRallyInfoProps>(e: T) => pipe(e, juxt([isInactive, notCompleted]), every(Boolean));
const isInactive = (e: GetRallyInfoProps) => pipe(e, prop('status'), eq(RallyStatus.inactive));
const notCompleted = (e: GetRallyInfoProps) => pipe(e, prop('completionDate'), isNull);
const isNeverExtendedBefore = <T extends GetRallyInfoProps>(e: T) => pipe(e, prop('extendedDueDate'), isNull);
const isKitExist = <T extends GetRallyInfoProps>(e: T) => pipe(e, prop('kitDeletedAt'), isNull);

export interface GetRallyDatesProps extends Pick<FetchRallyData, 'createdAt' | 'updatedAt' | 'status' | 'completionDate'> {
  count: number;
  total: number;
  deadline: Date | null;
}
interface HasDeadline extends GetRallyDatesProps {
  deadline: Date;
}
interface HasCompletionDate extends GetRallyDatesProps {
  completionDate: Date;
}
export const getRallyDates = (data: GetRallyDatesProps) =>
  pipe(
    data,
    derive('dDay')((e) => pipe(e, ableToGetDDay, match(constNull, getDeadline))),
    derive('since')((e) => pipe(e, prop('createdAt'), displayDateYyMmDd)),
    derive('percentage')(({ count, total }) => (count / total) * 100),
    derive('completedAt')((e) => pipe(e, hasCompletedDate, match(constNull, convertCompletedAt))),
    remain(['dDay', 'since', 'completedAt', 'percentage']),
  );

const getDeadline = ({ deadline }: HasDeadline) => pipe(deadline, diffDates(now()), convertMsToDate, (e) => (e === 0 ? 'Day' : String(e)));
const isActive = ({ status }: GetRallyDatesProps) => pipe(status, eq(RallyStatus.active));
const hasDeadline = ({ deadline }: GetRallyDatesProps) => pipe(deadline, notNull);
const ableToGetDDay = lift<GetRallyDatesProps, GetRallyDatesProps, HasDeadline>(everyTrue(isActive, hasDeadline));
const convertCompletedAt = (e: HasCompletionDate) => pipe(e, prop('completionDate'), displayDateYyMmDd);
const isCompleted = (e: GetRallyDatesProps): e is HasCompletionDate => pipe(e, prop('completionDate'), notNull);
const hasCompletedDate = lift<GetRallyDatesProps, GetRallyDatesProps, HasCompletionDate>(isCompleted);
