import { Prisma } from '@prisma/client';
import { KitModel, StampModel, UserModel } from './models';

type KitUploader = { uploader: Pick<UserModel, 'id' | 'name' | 'image'> };
type KitStamps = { stamps: Pick<StampModel, 'id' | 'objectKey'>[] };
export type KitResult = Pick<KitModel, 'id' | 'title' | 'description' | 'tags' | 'thumbnailImage' | 'rewardImage'> & KitUploader & KitStamps;

type KitCardUploader = { uploader: Pick<UserModel, 'image' | 'name'> };

export type KitCardInfo = Pick<KitModel, 'id' | 'title' | 'thumbnailImage' | 'tags'> & KitCardUploader;
export type KitCreate = Prisma.KitCreateArgs['data'];
export interface CreateKitProps extends Pick<KitCreate, 'title' | 'description' | 'tags'> {
  stamps: string[];
}
