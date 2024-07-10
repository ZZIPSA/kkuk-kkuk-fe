import { getRallyData } from '../../lib';
import { pipe } from '@fxts/core';
import { derive, remain } from '@/lib/utils';

export const getTexts = (id: string) =>
  pipe(
    id,
    getRallyData,
    derive('isCompleted')(({ completionDate }) => completionDate !== null),
    derive('title')(({ isCompleted }) => (isCompleted ? '랠리를 삭제하시겠어요?' : '랠리를 포기하시겠어요?')),
    derive('description')(({ isCompleted }) =>
      isCompleted ? '랠리를 삭제하면 다신 이어갈 수 없어요!' : '랠리를 포기하면 삭제되어 다신 이어갈 수 없어요!',
    ),
    remain(['title', 'description']),
  );
