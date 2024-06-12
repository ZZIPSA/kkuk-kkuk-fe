import { StampModel } from '@/types/models';

export const getRallyInfo = ({
  stamps,
  stampCount,
  starterId,
  viewerId,
  updatedAt,
}: {
  stamps: Pick<StampModel, 'id' | 'objectKey' | 'kitId'>[];
  stampCount: number;
  starterId: string;
  viewerId?: string;
  updatedAt: string;
}) => {
  const owned = starterId === viewerId;
  const isStampedToday = new Date().getDate() === new Date(updatedAt).getDate();
  const total = stamps.length;
  const count = stampCount + Number(isStampedToday); // 오늘까지 찍은 스탬프 개수
  const percentage = (count / total) * 100;
  return { total, count, percentage, owned, isStampedToday };
};
