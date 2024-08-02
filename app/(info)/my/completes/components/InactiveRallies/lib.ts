import { bind } from '@/lib/do';
import { MyRally } from '@/types/Rally';
import { pipe } from '@fxts/core';

export const getInfo = (rally: MyRally) => pipe(rally, bind('completed', isCompleted));

const isCompleted = ({
  stampCount,
  kit: {
    stamps: { length },
  },
}: MyRally) => stampCount === length;
