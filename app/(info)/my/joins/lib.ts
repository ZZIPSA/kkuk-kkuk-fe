import { MyRally, RallyStatus } from '@/types/Rally';
import { filter, pipe, toArray } from '@fxts/core';
import { fetchMyRallies } from '../lib';

export const fetchMyActiveRallies = async (userId: string) =>
  pipe(
    userId,
    fetchMyRallies, // 사용자 랠리 목록 요청
    filter(filterActive), // 완료된 랠리 필터링
    toArray, // 배열로 변환
  );

const filterActive = ({ status }: MyRally) => status === RallyStatus.active;
