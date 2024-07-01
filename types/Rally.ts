import { Prisma } from '@prisma/client';
import { rallySelect } from '@/app/api/lib/prisma';
import { KitModel, RallyModel, UserModel } from './models';
export { RallyStatus } from './models';

type RallyStarter = { starter: Pick<UserModel, 'id' | 'image' | 'name'> };
type RallyKit = {
  kit: Pick<KitModel, 'id' | 'title' | 'description' | 'tags' | 'thumbnailImage' | 'rewardImage' | 'stamps'>;
};
export type RallyInfo = Pick<RallyModel, 'id' | 'title' | 'description' | 'status' | 'stampCount' | 'createdAt' | 'updatedAt'> &
  RallyStarter &
  RallyKit;

export type MyRally = Prisma.RallyGetPayload<{ where: { starterId: string }; select: typeof rallySelect }>;

export interface JoinedRally extends MyRally {
  kit: MyRally['kit'];
  stampCount: number;
}

export interface CompletedRally extends MyRally {
  updatedAt: Date;
}
