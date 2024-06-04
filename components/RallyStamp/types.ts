export enum StampStatus {
  checked = 'checked', // 체크된 스탬프
  checkable = 'checkable', // 체크 가능한 스탬프
  uncheckable = 'uncheckable', // 체크 불가능한 스탬프
}
export enum StampKind {
  default = 'default', // 기본 스탬프
  reward = 'reward', // 보상 스탬프
}
export interface StampInfo {
  status: StampStatus;
  kind: StampKind;
  owned: boolean;
}
