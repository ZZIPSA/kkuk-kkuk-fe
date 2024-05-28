import { KitModel, UserModel } from './models';

type KitCardUploader = { uploader: Pick<UserModel, 'image' | 'name'> };

export type KitCardInfo = Pick<KitModel, 'id' | 'title' | 'thumbnailImage' | 'tags'> & KitCardUploader;
