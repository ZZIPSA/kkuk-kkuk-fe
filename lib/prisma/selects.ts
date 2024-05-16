import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = { id: true, email: true, profileImage: true, nickname: true };
export const kitSelect: Prisma.KitSelect = {
  id: true,
  title: true,
  description: true,
  tags: true,
  thumbnailImage: true,
  rewardImage: true,
  uploader: {
    select: userSelect,
  },
  createdAt: true,
  updatedAt: true,
};
export const kitCardSelect = {
  id: true,
  title: true,
  thumbnailImage: true,
  tags: true,
  uploader: { select: { nickname: true, profileImage: true } },
} satisfies Prisma.KitSelect;
export const rallySelect: Prisma.RallySelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  kit: { select: kitSelect },
  starter: {
    select: userSelect,
  },
  stampCount: true,
  createdAt: true,
  updatedAt: true,
};
