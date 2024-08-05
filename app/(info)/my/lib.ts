import { API_URL } from '@/lib/constants';
import { purify } from '@/lib/either';
import { resolveData, validResponse } from '@/lib/response';
import { MyRally } from '@/types/Rally';
import { pipe } from '@fxts/core';
import { notFound } from 'next/navigation';

export const fetchMyRallies = (userId: string) =>
  pipe(
    userId,
    getMyRalliesApi, // API 주소 생성
    fetch, // API 요청
    validResponse, // HTTP 상태코드 검사
    purify(notFound), // 404 에러 처리
    resolveData<MyRally[]>, // JSON 파싱 후 데이터 추출
  );

const getMyRalliesApi = (userId: string) => `${API_URL}/api/my/rallies?userId=${userId}`;
