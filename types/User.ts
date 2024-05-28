import { UserModel, AccountModel, RallyModel } from './models';

export type UserInfoResult = Pick<UserModel, 'image' | 'name'> & {
  accounts: Pick<AccountModel, 'provider' | 'userId'>[];
  rallies: Pick<RallyModel, 'status'>[];
};
