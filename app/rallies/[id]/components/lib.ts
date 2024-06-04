import { StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyPreviewStamp } from '@/types/Stamp';
import { RallyStampsInfo } from './types';

const getStampStatusUnstamped = (
  index: number,
  count: number, // 오늘의 스탬프를 찍기 전
) =>
  index < count // 이미 찍은 스탬프보다 이른 차례라면
    ? StampStatus.checked // 이미 찍은 스탬프
    : index === count // 지금까지 찍은 스탬프와 같은 차례라면
      ? StampStatus.checkable // 오늘의 찍을 스탬프
      : StampStatus.uncheckable; // 다음에 찍을 스탬프
const getStampStatusStamped = (
  index: number,
  count: number, // 오늘의 스탬프를 찍은 후
) =>
  index <= count // 이미 찍은 스탬프보다 빠른 차례라면
    ? StampStatus.checked // 이미 찍은 스탬프
    : StampStatus.uncheckable; // 다음에 찍을 스탬프
const getStampStatus = (
  isStampedToday: boolean, // 오늘의 스탬프를 찍은 여부에 따라 스탬프 상태 결정 함수 선택
) => (isStampedToday ? getStampStatusStamped : getStampStatusUnstamped);

const getStampKind = (index: number, total: number) => (index === total - 1 ? StampKind.reward : StampKind.default);
export const addStampPropsByIndex =
  ({ owned, stampCount, total, isStampedToday }: RallyStampsInfo) =>
  (stamp: RallyPreviewStamp, index: number) => ({
    ...stamp,
    order: index,
    status: getStampStatus(isStampedToday)(index, stampCount),
    kind: getStampKind(index, total),
    owned,
  });
