import { RallyStatus } from '@prisma/client';
import { MAX_STMAP_LENGTH } from '@/app/api/lib/constants';

export function getRallyStatus(stampCount: number): RallyStatus {
  return stampCount === MAX_STMAP_LENGTH ? RallyStatus.inactive : RallyStatus.active;
}
