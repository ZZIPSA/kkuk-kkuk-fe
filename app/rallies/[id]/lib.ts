import { RallyInfo } from '@/types/Rally';

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
      stamps: Array(6)
        .fill(null)
        .map((_, i) => ({
          id: `stamp-${i}`,
          kitId: '0000002',
          image: `https://picsum.photos/360?random=${i}`,
        })),
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
