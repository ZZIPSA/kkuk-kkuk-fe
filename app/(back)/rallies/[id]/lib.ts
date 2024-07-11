import { notFound } from 'next/navigation';
import { evolve, join, pipe, prop, tap } from '@fxts/core';
import { constNull } from '@/lib/always';
import { convertMsToDate, displayDateYyMmDd, now, diffDates, parseDate, parseNullableDate } from '@/lib/date';
import { awaited, bimap, lift, purify, match } from '@/lib/either';
import { handleError } from '@/lib/error';
import { resolveJson, validResponse } from '@/lib/response';
import { eq, derive, everyEq, remain, everyTrue, notNull } from '@/lib/utils';
import { FetchedRallyData, RallyData, RallyStatus } from '@/types/Rally';

export const getRallyData = async (id: string) =>
  pipe(
    id,
    getRallyApiUrl, // API URL + ID
    taggedFetch, // API 호출
    validResponse, // 응답이 실패라면 Left, 성공이라면 Right
    bimap(
      handleError, // 실패 시 에러 핸들러로 전달
      handleRallyData, // 성공 시 랠리 데이터 핸들러로 전달
    ),
    awaited, // Promise.all
    purify(notFound), // 404 에러 처리 -> TODO 에러 핸들링 추가
  );
const getRallyApiUrl = (id: string) => join('/')([process.env.API_URL, 'api', 'rallies', id]);
const taggedFetch = (url: string) => fetch(url, { next: { tags: ['rally', url.substring(url.lastIndexOf('/') + 1)] } });
const handleRallyData = (res: Response) =>
  pipe(
    res,
    resolveJson, // JSON 파싱
    getDataProp, // 'data' 프로퍼티 추출
    parseRallyDates, // 랠리 데이터에서 string으로 된 날짜 데이터(createAt, updatedAt)를 Date로 변환
  );
const getDataProp: (json: any) => FetchedRallyData = prop('data');
const parseRallyDates: (fetched: FetchedRallyData) => RallyData = evolve({
  createdAt: parseDate,
  updatedAt: parseDate,
  dueDate: parseNullableDate,
  lastStampDate: parseNullableDate,
  completionDate: parseNullableDate,
  extendedDueDate: parseNullableDate,
});

interface GetRallyInfoProps extends Pick<RallyData, 'updatedAt' | 'createdAt'> {
  stamps: RallyData['kit']['stamps'];
  starterId: RallyData['starter']['id'];
  viewerId?: string;
}
export const getRallyInfo = (data: GetRallyInfoProps) =>
  pipe(
    data,
    derive('owned')(({ starterId, viewerId }) => starterId === viewerId), // starterId와 viewerId가 같은지로 소유 여부 확인
    derive('total')(({ stamps }) => stamps.length), // 전체 스탬프 개수
    remain(['owned', 'total'] as const), // 필요한 값만 남기기
  );

export interface GetRallyDatesProps extends Pick<RallyData, 'createdAt' | 'updatedAt' | 'status'> {
  count: number;
  total: number;
  deadline: Date | null;
}
interface HasDeadline extends GetRallyDatesProps {
  deadline: Date;
}
export const getRallyDates = (data: GetRallyDatesProps) =>
  pipe(
    data,
    derive('dDay')((e) => pipe(e, ableToGetDDay, match(constNull, getDeadline))),
    derive('since')((e) => pipe(e, prop('createdAt'), displayDateYyMmDd)),
    derive('percentage')(({ count, total }) => (count / total) * 100),
    derive('completedAt')((e) => pipe(e, lift(isCompleted), match(constNull, convertCompletedAt))),
    remain(['dDay', 'since', 'completedAt', 'percentage']),
  );

const getDeadline = ({ deadline }: HasDeadline) => pipe(deadline, diffDates(now()), convertMsToDate, (e) => (e === 0 ? 'Day' : String(e)));
const isActive = ({ status }: GetRallyDatesProps) => pipe(status, eq(RallyStatus.active));
const hasDeadline = ({ deadline }: GetRallyDatesProps) => pipe(deadline, notNull);
const ableToGetDDay = lift<GetRallyDatesProps, GetRallyDatesProps, HasDeadline>(everyTrue(isActive, hasDeadline));
const convertCompletedAt = ({ updatedAt }: GetRallyDatesProps) => displayDateYyMmDd(updatedAt);
const isCompleted = everyEq<GetRallyDatesProps, number>(prop('count'), prop('total'));
