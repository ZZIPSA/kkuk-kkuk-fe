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
export type RallyByStarter = Prisma.RallyGetPayload<{ where: { starterId: string }; select: typeof rallySelect }>;

export interface JoinedRally extends MyRally {
  kit: MyRally['kit'];
  stampCount: number;
}

export interface CompletedRally extends MyRally {
  updatedAt: Date;
}
export type RallyData = Prisma.RallyGetPayload<{
  where: { id: string };
  select: typeof rallySelect;
}> & {
  stampable: boolean;
};
export interface FetchRallyData extends RallyData {
  stampable: boolean;
}
export interface FetchedRallyData
  extends Omit<FetchRallyData, 'createdAt' | 'updatedAt' | 'dueDate' | 'lastStampDate' | 'dueDate' | 'completionDate' | 'extendedDueDate'> {
  // JSON 데이터는 문자열이므로 날짜값은 Date로 변환해야 함
  createdAt: string;
  updatedAt: string;
  lastStampDate: string;
  dueDate: string;
  completionDate: string;
  extendedDueDate: string;
}
