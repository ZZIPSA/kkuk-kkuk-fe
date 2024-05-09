// TODO: 파이베이스 확인 후 수정 - id, nickname,profileImage 외 변동 가능성 있음
export type User = {
  id: string;
  nickname: string;
  profileImage: string;
  provider?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
