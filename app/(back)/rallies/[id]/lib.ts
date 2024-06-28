import { notFound } from 'next/navigation';
import { evolve, join, pipe, prop } from '@fxts/core';
import { convertMsToDate, displayDateYyMmDd } from '@/lib/date';
import { awaited, bimap, purify } from '@/lib/either';
import { handleError } from '@/lib/error';
import { resolveJson, validResponse } from '@/lib/response';
import { derive, parseDate, remain } from '@/lib/utils';
import { RallyData } from '@/types/Rally';

interface FetchedRallyData extends Omit<RallyData, 'createdAt' | 'updatedAt'> {
  // JSON 데이터는 문자열이므로 날짜값은 Date로 변환해야 함
  createdAt: string;
  updatedAt: string;
}

export const getRallyData = async (id: string) =>
  pipe(
    id,
    getRallyApiUrl, // API URL + ID
    fetch, // API 호출
    validResponse, // 응답이 실패라면 Left, 성공이라면 Right
    bimap(
      handleError, // 실패 시 에러 핸들러로 전달
      handleRallyData, // 성공 시 랠리 데이터 핸들러로 전달
    ),
    awaited, // Promise.all
    purify(notFound), // 404 에러 처리 -> TODO 에러 핸들링 추가
  );
const getRallyApiUrl = (id: string) => join('/')([process.env.API_URL, 'api', 'rallies', id]);
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
});

interface GetRallyInfoProps extends Pick<RallyData, 'updatedAt' | 'createdAt'> {
  stamps: RallyData['kit']['stamps'];
  count: number;
  starterId: RallyData['starter']['id'];
  viewerId?: string;
}
export const getRallyInfo = (data: GetRallyInfoProps) =>
  pipe(
    data,
    derive('isStampedToday')(getStampedToday), // 오늘 스탬프를 찍었는지 확인
    derive('owned')(({ starterId, viewerId }) => starterId === viewerId), // starterId와 viewerId가 같은지로 소유 여부 확인
    derive('total')(({ stamps }) => stamps.length), // 전체 스탬프 개수
    derive('percentage')(({ count, total }) => (count / total) * 100), // 완료된 스탬프 비율
    remain(['owned', 'isStampedToday', 'total', 'percentage'] as const), // 필요한 값만 남기기
  );
const getStampedToday = ({ updatedAt, count }: GetRallyInfoProps) =>
  count > 0 && // 카운트가 0이면 보통 생성한 직후 이므로 직후의 식이 참으로 판정되는 것을 방지
  new Date().getDate() === updatedAt.getDate(); // 오늘 날짜와 업데이트된 날짜가 같은지 확인

interface GetRallyInfoDatesProps extends Pick<RallyData, 'createdAt' | 'updatedAt' | 'status'> {
  percentage: ReturnType<typeof getRallyInfo>['percentage'];
  deadline: Date; // TODO - deadline from RallyData
}
export const getRallyInfoDates = (data: GetRallyInfoDatesProps) =>
  pipe(
    data,
    derive('isActive')(({ status }) => status === 'active'),
    derive('today')(() => new Date()),
    derive('dDay')(({ isActive, deadline, today }) => (isActive ? convertMsToDate(deadline.getTime() - today.getTime()) : null)),
    derive('since')(({ createdAt }) => displayDateYyMmDd(createdAt)),
    derive('until')(({ isActive, deadline }) => (isActive ? displayDateYyMmDd(deadline) : null)),
    derive('completed')(({ isActive, percentage, updatedAt }) => (!isActive && percentage === 100 ? displayDateYyMmDd(updatedAt) : null)),
    remain(['dDay', 'since', 'until', 'completed']),
  );
