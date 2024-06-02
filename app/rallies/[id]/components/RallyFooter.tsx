import { BasicButton as Button } from '@/components/ui/button';
import { Stamp } from '@/lib/icons';
import { cn } from '@/lib/utils';

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
}

export function RallyFooter({ owned, variant }: RallyFooterProps) {
  const is = {
    stampable: variant === RallyStampButtonVariant.Stampable,
    reward: variant === RallyStampButtonVariant.Reward,
    disabled: variant === RallyStampButtonVariant.Disabled,
  };
  return (
    <footer className="mt-auto flex flex-col gap-2">
      {owned && <Button className="w-full bg-background text-grey-400 border border-grey-100">친구에게 공유하기</Button>}
      <Button
        disabled={is.disabled}
        className={cn('w-full', {
          'bg-primary': is.stampable,
          'bg-indigo-500': is.reward,
          'bg-grey-100': is.disabled,
        })}
      >
        <Stamp
          className={cn('w-6 h-6 mr-1 fill-white', {
            'stroke-primary': is.stampable,
            'stroke-indigo-500': is.reward,
            'stroke-grey-100': is.disabled,
          })}
        />
        스탬프 찍기
      </Button>
    </footer>
  );
}
