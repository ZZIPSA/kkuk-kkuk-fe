import { RallyModel, UserModel } from './models';

type RallyStarter = { starter: Pick<UserModel, 'profileImage' | 'nickname'> };
export type RallyInfo = Pick<RallyModel, 'id' | 'title'> & RallyStarter;
