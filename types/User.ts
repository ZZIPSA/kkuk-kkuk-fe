import { UserModel, AccountModel, RallyModel } from './models';

export type UserInfoResult = Pick<UserModel, 'profileImage' | 'nickname'> & {
  accounts: AccountModel[];
  rallies: RallyModel[];
};
