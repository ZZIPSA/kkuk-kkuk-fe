import { UserModel, AccountModel, RallyModel } from './models';

export type UserInfoResult = Pick<UserModel, 'profileImage' | 'nickname'> & {
  accounts: Pick<AccountModel, 'provider' | 'userId'>[];
  rallies: Pick<RallyModel, 'status'>[];
};
