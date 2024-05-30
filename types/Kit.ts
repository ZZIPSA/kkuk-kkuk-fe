import { KitModel, StampModel, UserModel } from './models';

type KitUploader = { uploader: Pick<UserModel, 'id' | 'nickname' | 'profileImage'> };
type KitStamps = { stamps: Pick<StampModel, 'id' | 'image'>[] };
export type KitResult = Pick<KitModel, 'id' | 'title' | 'description' | 'tags' | 'thumbnailImage' | 'rewardImage'> & KitUploader & KitStamps;

type KitCardUploader = { uploader: Pick<UserModel, 'image' | 'name'> };

export type KitCardInfo = Pick<KitModel, 'id' | 'title' | 'thumbnailImage' | 'tags'> & KitCardUploader;
