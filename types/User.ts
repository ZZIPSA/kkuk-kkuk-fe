import { UserModel, AccountModel, RallyModel } from './models';

export type MyPageResult = Pick<UserModel, 'profileImage' | 'nickname'> & {
  accounts: AccountModel[];
  rallies: RallyModel[];
};
