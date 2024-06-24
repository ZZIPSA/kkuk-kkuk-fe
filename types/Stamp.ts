import { Prisma } from '@prisma/client';
import { StampModel } from './models';

export type RallyPreviewStamp = Pick<StampModel, 'id' | 'objectKey'>;
export type StampData = Prisma.StampGetPayload<{}>;
