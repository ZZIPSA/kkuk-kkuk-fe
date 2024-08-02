import { MyRally, RallyStatus } from '@/types/Rally';
import { filter, pipe, toArray } from '@fxts/core';
import { fetchMyRallies } from '../lib';

export const fetchMyInactiveRallies = async (userId: string) =>
  pipe(
    userId,
    fetchMyRallies, // 사용자 랠리 목록 요청
    filter(filterInactive), // 완료된 랠리 필터링
    toArray, // 배열로 변환
  );

const filterInactive = ({ status }: MyRally) => status === RallyStatus.inactive;
