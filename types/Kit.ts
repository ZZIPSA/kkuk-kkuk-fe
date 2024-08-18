import { kitSelect } from '@/app/api/lib/prisma';
import { Prisma } from '@prisma/client';
import { KitModel, StampModel, UserModel } from './models';

type KitUploader = { uploader: Pick<UserModel, 'id' | 'name' | 'image'> };
type KitStamps = { stamps: Pick<StampModel, 'id' | 'objectKey'>[] };
export type KitResult = Pick<KitModel, 'id' | 'title' | 'description' | 'tags' | 'thumbnailImage' | 'rewardImage'> & KitUploader & KitStamps;

export type KitCardUploader = Pick<UserModel, 'id' | 'image' | 'name'>;

export type KitCardInfo = Pick<KitModel, 'id' | 'title' | 'thumbnailImage' | 'tags'> & { uploader: KitCardUploader };
export type KitData = Prisma.KitGetPayload<{
  where: { id: string };
  select: typeof kitSelect;
}>;
export type KitCreate = Prisma.KitCreateArgs['data'];
export interface CreateKitProps extends Pick<KitCreate, 'title' | 'description' | 'tags'> {
  stamps: string[];
}

export type RawFetchedKits = { data: KitResult[]; meta: { nextCursor: string } };
export type FetchedKits = { cursor: string; kits: KitCardInfo[] };
export type FetchKits = (props: { cursor: string }) => Promise<FetchedKits>;
