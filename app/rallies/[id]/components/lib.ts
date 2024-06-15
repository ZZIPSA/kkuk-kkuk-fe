import { cn } from '@/lib/utils';
import { StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyStatus } from '@/types/Rally';
import { RallyPreviewStamp } from '@/types/Stamp';
import { rallyFooterStyles } from './styles';
import { RallyFooterInfo, RallyStampsInfo, RewardableConditionsProps, StampableConditionsProps } from './types';

const getStampStatus = ({ isStampedToday, index, count }: { index: number; count: number; isStampedToday: boolean }): StampStatus =>
  isStampedToday
    ? // 오늘 스탬프를 찍었고
      index <= count // 이미 찍은 스탬프보다 이르거나 같은 차례라면
      ? StampStatus.checked // 이미 찍은 스탬프 (le)
      : StampStatus.uncheckable // 아니면 다음에 찍을 스탬프 (gt)
    : // 오늘 스탬프를 찍지 않았고
      index < count // 이미 찍은 스탬프보다 이른 차례라면
      ? StampStatus.checked // 이미 찍은 스탬프 (lt)
      : index === count // 이미 찍은 스탬프와 같은 차례라면
        ? StampStatus.checkable // 오늘의 찍을 스탬프 (eq)
        : StampStatus.uncheckable; // 둘다 아니면 다음에 찍을 스탬프 (gt)
const getStampKind = (index: number, total: number) => (index === total - 1 ? StampKind.reward : StampKind.default);
export const addStampPropsByIndex =
  ({ owned, stampCount: count, total, isStampedToday }: RallyStampsInfo) =>
  (stamp: RallyPreviewStamp, index: number) => ({
    ...stamp,
    status: getStampStatus({ isStampedToday, index, count }),
    kind: getStampKind(index, total),
    owned,
  });

// Footer

enum RallyFooterButtonContent {
  NotOwned = '이 키트로 랠리 시작하기',
  Success = '스탬프 랠리 완주 성공!',
  StampedToday = '오늘의 목표를 완료했어요!',
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

/**
 * 랠리를 소유하고, 완료하지 않았고, 오늘 스탬프를 찍지 않았으면 스탬프를 찍을 수 있음
 */
const getStampable = (props: StampableConditionsProps) => getSatisfiedIndex(props) === -1;
/**
 * 리워드를 찍을 수 있는 경우 (마지막 스탬프만 남겨둔 경우)
 */
const getRewardable = ({ stampCount, total }: RewardableConditionsProps) => stampCount === total - 1;
export const getFooterConditions = (props: RallyFooterInfo) => ({
  stampable: getStampable(props),
  rewardable: getRewardable(props),
  owned: props.owned,
});
export const getFooterVariant = ({ stampable, rewardable, owned }: ReturnType<typeof getFooterConditions>) => ({
  notOwned: !owned, // 소유하지 않은 경우
  disabled: owned && !stampable, // 스탬프를 찍을 수 없는 경우 (오늘 스탬프를 찍었거나 랠리를 완료한 경우)
  reward: owned && stampable && rewardable,
  stampable: owned && stampable && !rewardable, // (리워드가 아닌) 스탬프를 찍을 수 있는 경우
});
export const getFooterStyles = ({ stampable, reward, notOwned, disabled }: ReturnType<typeof getFooterVariant>) => ({
  footer: rallyFooterStyles.footer,
  shareButton: cn(rallyFooterStyles.shareButton, {
    [rallyFooterStyles.shareButtonDisabled]: notOwned,
  }),
  stampButton: cn(rallyFooterStyles.stampButton.default, {
    [rallyFooterStyles.stampButton.primary]: stampable,
    [rallyFooterStyles.stampButton.indigo]: reward,
    [rallyFooterStyles.stampButton.grey]: disabled,
    [rallyFooterStyles.stampButton.primary]: notOwned,
  }),
  stampIcon: cn(rallyFooterStyles.stampIcon.default, {
    [rallyFooterStyles.stampIcon.primary]: stampable,
    [rallyFooterStyles.stampIcon.indigo]: reward,
  }),
});
