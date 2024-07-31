import { bind } from '@/lib/do';
import { MyRally } from '@/types/Rally';
import { pipe } from '@fxts/core';

export const getInfo = (rally: MyRally) => pipe(rally, bind('completed', isCompleted), bind('label', getLabel));

const isCompleted = ({
  stampCount,
  kit: {
    stamps: { length },
  },
}: MyRally) => stampCount === length;
const getLabel = ({ completed }: { completed: boolean } & MyRally) => (completed ? '완료' : '실패');
