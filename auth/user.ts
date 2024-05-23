import { prisma } from '@/lib/prisma';

const user = prisma.user.findFirstOrThrow({}).then((user) => user);
export default await user;
