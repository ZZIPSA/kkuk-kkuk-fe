import { RallyModel, UserModel } from './models';

type RallyStarter = { starter: Pick<UserModel, 'profileImage' | 'nickname'> };
export type RallyInfo = Pick<RallyModel, 'id' | 'title'> & RallyStarter;

export interface MyRally {
  id: string;
  kit: {
    title: string;
    thumbnailImage: string;
  };
}

export interface JoinedRally extends MyRally {
  kit: MyRally['kit'] & { _count: { stamps: number } };
  stampCount: number;
}

