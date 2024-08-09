import { accountSelect, Prisma, userInfoSelect } from '@/app/api/lib/prisma';
import { UserModel, AccountModel, RallyModel } from './models';

export type UserInfoResult = Pick<UserModel, 'image' | 'name'> & {
  accounts: Pick<AccountModel, 'provider' | 'userId'>[];
  rallies: Pick<RallyModel, 'status'>[];
};

export type UserData = Prisma.UserGetPayload<{
  where: { id: string };
  select: typeof userInfoSelect;
}>;

export type AccountData = Prisma.AccountGetPayload<{ where: { userId: string }; select: typeof accountSelect }>;
