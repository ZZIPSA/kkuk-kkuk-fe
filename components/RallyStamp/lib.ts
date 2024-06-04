import { StampInfo, StampKind, StampStatus } from './types';

export const getConditions = ({ status, kind, owned }: StampInfo) => ({
  checked: status === StampStatus.checked,
  checkable: status === StampStatus.checkable,
  uncheckable: status === StampStatus.uncheckable,
  default: kind === StampKind.default,
  reward: kind === StampKind.reward,
  owned,
});
