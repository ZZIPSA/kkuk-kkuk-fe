import type { Prisma } from '@prisma/client';
import type { prisma } from '@/lib/prisma';
import type { kitCardSelect } from '@/lib/prisma';

export type KitCardInfo = NonNullable<Prisma.Result<typeof prisma.kit, { select: typeof kitCardSelect }, 'findFirst'>>;
export type KitCardsInfo = Prisma.Result<typeof prisma.kit, { select: typeof kitCardSelect }, 'findMany'>;
