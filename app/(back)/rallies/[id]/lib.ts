import type { GET } from '@/app/api/rallies/[id]/route';
import { evolve, pipe, prop } from '@fxts/core';
import { constNull } from '@/lib/always';
import { API_URL } from '@/lib/constants';
import { convertMsToDate, displayDateYyMmDd, now, diffDates, parseDate, parseNullableDate } from '@/lib/date';
import { lift, match } from '@/lib/either';
import { fetchDataOrNotFound } from '@/lib/response';
import { eq, derive, remain, everyTrue, notNull } from '@/lib/utils';
import { FetchedRallyData, FetchRallyData, RallyStatus } from '@/types/Rally';
import { bind } from '@/lib/do';

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

export const flattenRallyData = (data: FetchRallyData) =>
  pipe(
    data,
    bind('count', flats['count']),
    bind('starterId', flats['starterId']),
    bind('kitId', flats['kitId']),
    bind('stamps', flats['stamps']),
    bind('rewardImage', flats['rewardImage']),
    bind('kitDeletedAt', flats['kitDeletedAt']),
  );

const flats = {
  count: ({ stampCount }: { stampCount: FetchRallyData['stampCount'] }) => stampCount,
  starterId: ({ starter: { id } }: FetchRallyData) => id,
  kitId: ({ kit: { id } }: FetchRallyData) => id,
  stamps: ({ kit: { stamps } }: FetchRallyData) => stamps,
  rewardImage: ({ kit: { rewardImage } }: FetchRallyData) => rewardImage,
  kitDeletedAt: ({ kit: { deletedAt } }: FetchRallyData) => deletedAt,
} as const;

interface AppendRallyInfoProps extends ReturnType<typeof flattenRallyData> {
  viewerId?: string;
}
export const appendRallyInfo = (data: AppendRallyInfoProps) =>
  pipe(
    data,
    bind('owned', appends['owned']),
    bind('total', appends['total']),
    bind('failed', appends['failed']),
    bind('extendable', appends['extendable']),
    bind('startable', appends['startable']),
    bind('deadline', appends['deadline']),
  );
const appends = {
  // 소유 여부: starterId와 viewerId가 같은지
  owned: ({ starterId, viewerId }: AppendRallyInfoProps) => starterId === viewerId,
  // 전체 스탬프 개수
  total: ({ stamps: { length } }: AppendRallyInfoProps) => length,
  // 실패 여부: 랠리가 비활성화 됐고, 완주일이 없는 경우
  failed: ({ status, completionDate }: AppendRallyInfoProps) => status === RallyStatus.inactive && completionDate === null,
  // 연장 가능 여부: 연장 기한이 없는 경우
  extendable: ({ extendedDueDate }: AppendRallyInfoProps) => extendedDueDate === null,
  // 시작 가능 여부: 키트가 삭제된 경우(키트 삭제일이 있는 경우)
  startable: ({ kitDeletedAt }: AppendRallyInfoProps) => kitDeletedAt !== null,
  // 마감일: 연장 기한이 있는 경우 연장 기한, 없는 경우 마감일
  deadline: ({ dueDate, extendedDueDate }: AppendRallyInfoProps) => extendedDueDate ?? dueDate,
} as const;

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
