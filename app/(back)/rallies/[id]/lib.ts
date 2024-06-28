import { StampModel } from '@/types/models';
import { notFound } from 'next/navigation';
import { evolve, join, pipe, prop } from '@fxts/core';
import { awaited, bimap, purify } from '@/lib/either';
import { handleError } from '@/lib/error';
import { resolveJson, validResponse } from '@/lib/response';
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

export const getRallyInfo = ({
  stamps,
  stampCount,
  starterId,
  viewerId,
  updatedAt,
}: {
  stamps: Pick<StampModel, 'id' | 'objectKey' | 'kitId'>[];
  stampCount: number;
  starterId: string;
  viewerId?: string;
  updatedAt: string;
}) => {
  const owned = starterId === viewerId;
  const isStampedToday = new Date().getDate() === new Date(updatedAt).getDate();
  const total = stamps.length;
  const count = stampCount + Number(isStampedToday); // 오늘까지 찍은 스탬프 개수
  const percentage = (count / total) * 100;
  return { total, count, percentage, owned, isStampedToday };
};
