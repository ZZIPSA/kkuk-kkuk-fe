import { RallyStatus } from '@/types/Rally';

export interface RallyStampsInfo {
  total: number;
  count: number;
  owned: boolean;
  stampable: boolean;
  rewardImage: string;
  completionDate: Date | null;
}
export interface RewardableConditionsProps {
  count: number;
  total: number;
}
export interface StampableConditionsProps {
  owned: boolean;
  status: RallyStatus;
  stampable: boolean;
}
export interface RallyFooterInfo extends RewardableConditionsProps, StampableConditionsProps {}
