import { StampInfo, StampKind, StampStatus } from './types';
import { stampContainerStyles, stampImageStyles, stampCheckIconStyles, stampGiftIconStyles } from './styles';
import { cn } from '@/lib/utils';

export const getConditions = ({ status, kind, owned }: StampInfo) => ({
  checked: status === StampStatus.checked,
  checkable: status === StampStatus.checkable,
  uncheckable: status === StampStatus.uncheckable,
  default: kind === StampKind.default,
  reward: kind === StampKind.reward,
  owned,
});
export const getElementConditions = (is: ReturnType<typeof getConditions>) => ({
  border: {
    // 테두리 색상
    primary: !is.uncheckable && !is.reward, // 체크 가능한 기본 스탬프
    indigo: !is.uncheckable && is.reward, // 체크 가능한 보상 스탬프
    grey: is.uncheckable, // 체크 불가능한 스탬프
    solid: !is.uncheckable,
    dashed: is.uncheckable,
  },
  filter: {
    // 필터
    grayscale: is.uncheckable,
  },
  icon: {
    // 아이콘
    check: is.checked
      ? {
          // 체크된 스탬프
          primary: is.default,
          indigo: is.reward,
        }
      : null,
    gift:
      is.reward && !(is.owned && is.checked)
        ? {
            // 보상 스탬프
            indigo: !is.uncheckable,
            grey: is.uncheckable,
          }
        : null,
  },
});
export const getStyles = ({ border, filter, icon }: ReturnType<typeof getElementConditions>) => ({
  container: cn(stampContainerStyles.default, {
    [stampContainerStyles.primary]: border.primary,
    [stampContainerStyles.indigo]: border.indigo,
    [stampContainerStyles.grey]: border.grey,
    [stampContainerStyles.solid]: border.solid,
    [stampContainerStyles.dashed]: border.dashed,
  }),
  image: cn(stampImageStyles.default, {
    [stampImageStyles.grayscale]: filter.grayscale,
  }),
  check: cn(stampCheckIconStyles.default, {
    [stampCheckIconStyles.primary]: icon.check?.primary,
    [stampCheckIconStyles.indigo]: icon.check?.indigo,
  }),
  gift: cn(stampGiftIconStyles.default, {
    [stampGiftIconStyles.indigo]: icon.gift?.indigo,
    [stampGiftIconStyles.grey]: icon.gift?.grey,
  }),
});
