import { StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyStatus } from '@/types/Rally';
import { RallyPreviewStamp } from '@/types/Stamp';
import { RallyFooterInfo, RallyStampsInfo, RewardableConditionsProps, StampableConditionsProps } from './types';

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

// Footer

enum RallyFooterButtonContent {
  NotOwned = '이 키트로 랠리 시작하기',
  Success = '스탬프 랠리 완주 성공!',
  StampedToday = '오늘의 스탬프 클리어!',
  Stampable = '스탬프 찍기',
}
const footerButtonContents = [
  RallyFooterButtonContent.NotOwned,
  RallyFooterButtonContent.Success,
  RallyFooterButtonContent.StampedToday,
  RallyFooterButtonContent.Stampable,
] as const;
/**
 * 스탬프를 찍을 수 있는 조건
 * @returns [소유 여부, 완료 여부, 오늘 스탬프 찍었는지 여부]
 */
const getStampableConditions = ({ owned, status, isStampedToday }: StampableConditionsProps) =>
  [
    !owned, // 소유 여부
    status === RallyStatus.inactive, // 완료 여부
    isStampedToday, // 오늘 스탬프 찍었는지 여부
  ] as const;
/**
 * 처음으로 만족하는 조건의 인덱스 반환
 * @returns {number} 0: 소유하지 않은 경우, 1: 완료한 경우, 2: 오늘 스탬프를 찍은 경우, -1: 스탬프 찍을 수 있는 경우
 */
const getSatisfiedIndex = (props: StampableConditionsProps) => getStampableConditions(props).findIndex(Boolean);
/**
 * 만족하는 조건의 인덱스가
 * -  0: 소유하지 않았으므로 NotOwned 반환
 * -  1: 완료했으므로 Success 반환
 * -  2: 오늘 스탬프를 찍었으므로 StampedToday 반환
 * - -1: 스탬프를 찍을 수 있으므로 Stampable 반환
 * @returns {RallyFooterButtonContent}
 */
export const getFooterContent = (props: StampableConditionsProps) => footerButtonContents.at(getSatisfiedIndex(props));
