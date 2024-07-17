import { always, every, identity, juxt, pipe, prop, tap } from '@fxts/core';
import { filter, lift, match, of } from '@/lib/either';
import { Do, bind, assign } from '@/lib/do';
import { cn, eq, everyEq, notNull, tapLog } from '@/lib/utils';
import { StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyStatus } from '@/types/Rally';
import { RallyPreviewStamp } from '@/types/Stamp';
import { rallyFooterStyles } from './styles';
import { RallyFooterInfo, RallyStampsInfo, RewardableConditionsProps, StampableConditionsProps } from './types';

type StampData = RallyStampsInfo & RallyPreviewStamp & { index: number };

export const addStampPropsByIndex = (info: RallyStampsInfo) => (stamp: RallyPreviewStamp, index: number) =>
  pipe(Do, assign(stamp), assign(info), bind('index', always(index)), bindStampInfo);
const bindStampInfo = (e: StampData) => pipe(e, bind('status', getStampStatus), bind('kind', getStampKind), bind('objectKey', replaceWithReward));

const getStampStatus = (e: StampData) => pipe(e, of<StampStatus, typeof e>, filterChecked, filterUncheckable, tapLog('getStampStatus'), mapCheckable);
const filterChecked = filter(({ index, count }: StampData) => index >= count, always(StampStatus.checked));
const isCheckable = (e: StampData) => pipe(e, juxt([prop('stampable'), isIndexCount]), every(Boolean));
const filterUncheckable = filter(isCheckable, always(StampStatus.uncheckable));
const isIndexCount = everyEq<StampData, number>(prop('index'), prop('count'));
const mapCheckable = match<StampStatus, unknown, StampStatus>(identity, always(StampStatus.checkable));

const getStampKind = ({ index, total }: { index: number; total: number }) => (index === total - 1 ? StampKind.reward : StampKind.default);

const replaceWithReward = (e: StampData & { kind: StampKind }) => pipe(e, lift(isCompletedReward), match(prop('objectKey'), prop('rewardImage')));
const isCompletedReward = (e: { kind: StampKind; completionDate: Date | null }) => pipe(e, juxt([isReward, isCompleted]), every(Boolean));
const isReward = (e: { kind: StampKind }) => pipe(e, prop('kind'), eq(StampKind.reward));
const isCompleted = (e: { completionDate: Date | null }) => pipe(e, prop('completionDate'), notNull);

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
const getStampableConditions = ({ owned, status, stampable }: StampableConditionsProps) =>
  [
    !owned, // 소유 여부
    status === RallyStatus.inactive, // 완료 여부
    !stampable, // 오늘 스탬프 찍었는지 여부
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
const getRewardable = ({ count, total }: RewardableConditionsProps) => count === total - 1;
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
