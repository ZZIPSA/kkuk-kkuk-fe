import { StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyPreviewStamp } from '@/types/Stamp';
import { RallyStampsInfo } from './types';

const getStampStatus = (index: number, count: number) => {
  if (index < count) return StampStatus.checked;
  if (index === count) return StampStatus.checkable;
  return StampStatus.uncheckable;
};
const getStampKind = (index: number, total: number) => (index === total - 1 ? StampKind.reward : StampKind.default);
export const addStampPropsByIndex =
  ({ owned, stampCount, total }: RallyStampsInfo) =>
  (stamp: RallyPreviewStamp, index: number) => ({
    ...stamp,
    order: index,
    status: getStampStatus(index, stampCount),
    kind: getStampKind(index, total),
    owned,
  });
