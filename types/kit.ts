import { KitModel, UserModel } from './models';

type KitCardUploader = { uploader: Pick<UserModel, 'profileImage' | 'nickname'> };

export type KitCardInfo = Pick<KitModel, 'id' | 'title' | 'thumbnailImage' | 'tags'> & KitCardUploader;
