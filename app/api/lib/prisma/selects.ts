import { Prisma } from '@prisma/client';

export const accountSelect = { provider: true, providerAccountId: true, isPublic: true } satisfies Prisma.AccountSelect;
export const userSelect = { id: true, email: true, image: true, name: true } satisfies Prisma.UserSelect;
export const kitSelect = {
  id: true,
  title: true,
  description: true,
  tags: true,
  thumbnailImage: true,
  rewardImage: true,
  blurredImage: true,
  stamps: true,
  uploader: {
    select: userSelect,
  },
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} satisfies Prisma.KitSelect;

export const kitCardSelect = {
  id: true,
  title: true,
  thumbnailImage: true,
  tags: true,
  uploader: { select: { name: true, image: true } },
} satisfies Prisma.KitSelect;

export const rallySelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  kit: { select: kitSelect },
  starter: {
    select: userSelect,
  },
  stampCount: true,
  lastStampDate: true,
  dueDate: true,
  completionDate: true,
  extendedDueDate: true,
  isPublic: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.RallySelect;
export const userInfoSelect = {
  ...userSelect,
  accounts: {
    select: accountSelect,
  },
  rallies: {
    orderBy: { id: 'desc' },
    select: rallySelect,
  },
  kits: {
    orderBy: { id: 'desc' },
    select: kitSelect,
  },
} satisfies Prisma.UserSelect;
