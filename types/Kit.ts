import { KitModel, StampModel, UserModel } from './models';

type KitUploader = { uploader: Pick<UserModel, 'id' | 'nickname' | 'profileImage'> };
type KitStamps = { stamps: Pick<StampModel, 'id' | 'image'>[] };
export type KitResult = Pick<KitModel, 'id' | 'title' | 'description' | 'tags' | 'thumbnailImage' | 'rewardImage'> & KitUploader & KitStamps;

type KitCardUploader = { uploader: Pick<NonNullable<UserModel>, 'profileImage' | 'nickname'> };
export type KitCardInfo = Pick<KitResult, 'id' | 'title' | 'thumbnailImage' | 'tags'> & KitCardUploader;
