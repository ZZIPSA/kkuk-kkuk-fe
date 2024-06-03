import { BasicButton as Button } from '@/components/ui/button';
import { Stamp } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { rallyFooterStyles } from './styles';
import { StampButtonContent } from '../lib';

enum RallyStampButtonVariant {
  Stampable = 'stampable',
  Reward = 'reward',
  Disabled = 'disabled',
}

export const getButtonVariant = (isStampable: boolean, isRewardable: boolean) =>
  isStampable ? (isRewardable ? RallyStampButtonVariant.Reward : RallyStampButtonVariant.Stampable) : RallyStampButtonVariant.Disabled;

interface RallyFooterProps {
  owned: boolean;
  variant: RallyStampButtonVariant;
  stampButtonContent: StampButtonContent;
}

export function RallyFooter({ owned, variant, stampButtonContent }: RallyFooterProps) {
  const is = {
    stampable: variant === RallyStampButtonVariant.Stampable,
    reward: variant === RallyStampButtonVariant.Reward,
    disabled: variant === RallyStampButtonVariant.Disabled,
  };
  return (
    <footer className={rallyFooterStyles.footer}>
      <Button
        className={cn(rallyFooterStyles.shareButton, {
          [rallyFooterStyles.shareButtonDisabled]: !owned,
        })}
      >
        친구에게 공유하기
      </Button>
      <Button
        disabled={is.disabled}
        className={cn(rallyFooterStyles.stampButton.default, {
          [rallyFooterStyles.stampButton.primary]: is.stampable,
          [rallyFooterStyles.stampButton.indigo]: is.reward,
          [rallyFooterStyles.stampButton.grey]: is.disabled,
        })}
      >
        <Stamp
          className={cn(rallyFooterStyles.stampIcon.default, {
            [rallyFooterStyles.stampIcon.primary]: is.stampable,
            [rallyFooterStyles.stampIcon.indigo]: is.reward,
            [rallyFooterStyles.stampIcon.grey]: is.disabled,
          })}
        />
        {stampButtonContent}
      </Button>
    </footer>
  );
}
