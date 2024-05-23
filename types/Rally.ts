import { RallyModel, UserModel } from './models';

type RallyStarter = { starter: Pick<UserModel, 'profileImage' | 'nickname'> };
export type RallyInfo = Pick<RallyModel, 'id' | 'title'> & RallyStarter;

export interface MyRally {
  id: string;
  stampCount: number;
  kit: {
    title: string;
    _count: { stamps: number };
    thumbnailImage: string;
  };
}
