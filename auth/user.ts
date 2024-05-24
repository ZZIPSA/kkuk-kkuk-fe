import { prisma } from '@/lib/prisma';

const user = {
  id: 'clwhgit650000doaippp04jqa',
  email: 'user1@example.com',
  emailVerified: null,
  profileImage: 'https://picsum.photos/360',
  nickname: 'User1',
  createdAt: new Date('2021-08-31T07:00:00.000Z'),
  updatedAt: null,
  deletedAt: null,
};

// prisma.user.findFirstOrThrow({}).then((user) => user);
export default await user;
