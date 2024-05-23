import { PrismaClient, RallyStatus } from '@prisma/client';

const prisma = new PrismaClient();

function generateRandomTag() {
  const possibleTags = [
    '뫄뫄장르',
    '🚀연성해주세요',
    '솨솨캐릭',
    'AxB',
    'BL',
    '10글자짜리어떤게임',
    '테스트',
    '6일_챌린지',
    '작심삼일이두번이면끝',
    '외않되',
  ];

  const tagCount = Math.floor(Math.random() * 4);
  const tags = [];

  while (tags.length < tagCount) {
    const tag = possibleTags[Math.floor(Math.random() * possibleTags.length)];
    tags.push(tag);
  }

  return tags;
}

async function main() {
  // 모든 테이블의 데이터를 삭제
  await prisma.$transaction([
    prisma.rally.deleteMany(),
    prisma.stamp.deleteMany(),
    prisma.kit.deleteMany(),
    prisma.user.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
  ]);

  // 사용자 생성
  const userCreationPromises = Array.from({ length: 50 }, (_, index) => {
    return prisma.user.create({
      data: {
        email: `user${index + 1}@example.com`,
        nickname: `User${index + 1}`,
        profileImage: 'https://picsum.photos/360',
        accounts: {
          create: [
            {
              type: 'twitter',
              provider: 'twitter',
              providerAccountId: `user${index + 1}`,
            },
          ],
        },
        sessions: {
          create: [
            {
              sessionToken: `sessiontoken${index + 1}`,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            },
          ],
        },
      },
    });
  });

  const users = await Promise.all(userCreationPromises);

  // 키트 및 스탬프 생성
  const kitCreationPromises = Array.from({ length: 30 }, (_, index) => {
    const tags = generateRandomTag();
    return prisma.kit.create({
      data: {
        id: String(index + 1).padStart(7, '0'),
        title: `키트 ${index + 1}`,
        description: `${index + 1}번 키트의 설명입니다.`,
        thumbnailImage: 'https://picsum.photos/360',
        rewardImage: 'https://picsum.photos/360',
        tags,
        uploaderId: users[Math.floor(Math.random() * users.length)].id,
        stamps: {
          create: Array.from({ length: 6 }, (_, stampIndex) => ({
            image: 'https://picsum.photos/360',
          })),
        },
      },
      include: {
        stamps: true,
      },
    });
  });

  const kits = await Promise.all(kitCreationPromises);

  // 랠리 생성
  const rallyCreationPromises = Array.from({ length: 50 }, (_, index) => {
    const stampCount = Math.floor(Math.random() * 7);
    return prisma.rally.create({
      data: {
        title: `랠리 ${index + 1}`,
        description: `${index + 1}번 랠리에 대한 설명입니다.`,
        stampCount,
        status: stampCount === 6 ? RallyStatus.inactive : RallyStatus.active,
        kitId: kits[Math.floor(Math.random() * kits.length)].id,
        starterId: users[Math.floor(Math.random() * users.length)].id,
      },
    });
  });

  await Promise.all(rallyCreationPromises);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
