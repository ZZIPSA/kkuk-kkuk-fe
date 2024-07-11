import { getRallyData } from '../../lib';
import { pipe } from '@fxts/core';
import { derive, remain } from '@/lib/utils';

export const getTexts = (id: string) =>
  pipe(
    id,
    getRallyData,
    derive('isCompleted')(({ completionDate }) => completionDate !== null),
    derive('action')(({ isCompleted }) => (isCompleted ? '삭제' : '포기')),
    derive('title')(({ action }) => `랠리를 ${action}하시겠어요?`),
    derive('description')(({ action }) => `랠리를 ${action}하면 더 이상 이 랠리를 조회할 수 없어요!`),
    remain(['title', 'description']),
  );
