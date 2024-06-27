import { RallyStatus } from '@/types/Rally';

export interface RallyStampsInfo {
  total: number;
  count: number;
  owned: boolean;
  isStampedToday: boolean;
}
export interface RewardableConditionsProps {
  count: number;
  total: number;
}
export interface StampableConditionsProps {
  owned: boolean;
  status: RallyStatus;
  isStampedToday: boolean;
}
export interface RallyFooterInfo extends RewardableConditionsProps, StampableConditionsProps {}
