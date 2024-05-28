import { RallyModel, UserModel } from './models';
export { RallyStatus } from './models';

type RallyStarter = { starter: Pick<UserModel, 'image' | 'name'> };
export type RallyInfo = Pick<RallyModel, 'id' | 'title'> & RallyStarter;

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
