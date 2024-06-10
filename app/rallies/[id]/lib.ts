import { RallyInfo, RallyStatus } from '@/types/Rally';
import { StampModel } from '@/types/models';

// TODO: 테스트용 상수 제거
export const dummy = {
  data: {
    id: 'clwnjgo46006gdnxe8fafr234',
    title: '랠리 3',
    description: '3번 랠리에 대한 설명입니다.',
    status: 'active',
    kit: {
      id: '0000002',
      title: '키트 2',
      description: '2번 키트의 설명입니다.',
      tags: ['6일_챌린지'],
      thumbnailImage: 'https://picsum.photos/360',
      rewardImage: 'https://picsum.photos/360',
      stamps: Array.from(
        { length: 6 },
        (_, i) =>
          ({
            id: `stamp-${i}`,
            kitId: '0000002',
            image: `https://picsum.photos/360?random=${i}`,
            objectKey: `https://picsum.photos/360?random=${i}`,
          }) satisfies Pick<StampModel, 'id' | 'objectKey' | 'image' | 'kitId'>,
      ),
      // uploader: { id: 'clwnjgnpl000fdnxe0xbwk5qv', email: 'user12@example.com', image: 'https://picsum.photos/360', name: 'User12' },
      // createdAt: '2024-05-26T12:51:33.034Z',
      // updatedAt: null,
    },
    starter: { id: 'asd', image: 'https://picsum.photos/360', name: 'User5' },
    stampCount: 3,
    createdAt: new Date('2024-05-26T12:51:33.271Z'),
    updatedAt: null,
  },
} satisfies { data: RallyInfo };
// TODO: 레이아웃 테스트용 임시 변수를 ID로부터 추출하는 함수
export const getTempValue = (id: string) => ({
  stampCount: Number(id.at(0)), // ID 첫자리를 전날까지 찍은 스탬프 개수로 사용
  isStampedToday: id.at(1) === '1', // ID 둘째자리를 오늘 스탬프 여부로 사용
  owned: id.at(2) !== '1', // ID 셋째자리를 소유 여부로 사용 // user?.id === starter.id;
});
export const getRallyInfo = ({
  stamps,
  stampCount,
  isStampedToday,
}: {
  stamps: Pick<StampModel, 'id' | 'objectKey' | 'kitId'>[];
  stampCount: number;
  isStampedToday: boolean;
}) => {
  const total = stamps.length;
  const count = stampCount + Number(isStampedToday); // 오늘까지 찍은 스탬프 개수
  const status = count === total ? RallyStatus.inactive : RallyStatus.active; // TODO: 레이아웃 테스트용 임시 변수로 도장을 모두 채웠다면 'active', 아니면 'inactive'
  const percentage = (count / total) * 100;
  return { total, count, status, percentage };
};
