import { BasicButton as Button } from '@/components/ui/button';
import { Stamp } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { rallyFooterStyles } from './styles';
import { RallyFooterButtonContent } from '../lib';

enum RallyFooterButtonVariant {
  stampable = 'stampable',
  reward = 'reward',
  disabled = 'disabled',
}

export const getFooterButtonVariant = (isStampable: boolean, isRewardable: boolean) =>
  isStampable ? (isRewardable ? RallyFooterButtonVariant.reward : RallyFooterButtonVariant.stampable) : RallyFooterButtonVariant.disabled;

interface RallyFooterProps {
  owned: boolean;
  variant: RallyFooterButtonVariant;
  content: RallyFooterButtonContent;
}

export function RallyFooter({ owned, variant, content }: RallyFooterProps) {
  const is = {
    stampable: variant === RallyFooterButtonVariant.stampable,
    reward: variant === RallyFooterButtonVariant.reward,
    disabled: variant === RallyFooterButtonVariant.disabled,
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
        {content}
      </Button>
    </footer>
  );
}
