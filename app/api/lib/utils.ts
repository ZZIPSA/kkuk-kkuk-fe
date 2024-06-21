import { RallyStatus } from '@prisma/client';

export function getRallyStatus(stampCount: number): RallyStatus {
  return stampCount === 6 ? RallyStatus.inactive : RallyStatus.active;
}
