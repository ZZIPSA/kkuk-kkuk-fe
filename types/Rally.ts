import { KitModel, RallyModel, UserModel } from './models';
export { RallyStatus } from './models';

type RallyStarter = { starter: Pick<UserModel, 'id' | 'image' | 'name'> };
type RallyKit = {
  kit: Pick<KitModel, 'id' | 'title' | 'description' | 'tags' | 'thumbnailImage' | 'rewardImage' | 'stamps'>;
};
export type RallyInfo = Pick<RallyModel, 'id' | 'title' | 'description' | 'status' | 'stampCount' | 'createdAt' | 'updatedAt'> &
  RallyStarter &
  RallyKit;

export interface MyRally extends Pick<RallyModel, 'id' | 'status' | 'stampCount' | 'updatedAt'> {
  kit: Pick<RallyModel['kit'], 'thumbnailImage' | 'title'> & { _count: { stamps: number } };
}

export interface JoinedRally extends MyRally {
  kit: MyRally['kit'] & { _count: { stamps: number } };
  stampCount: number;
}

export interface CompletedRally extends MyRally {
  updatedAt: Date | null;
}
