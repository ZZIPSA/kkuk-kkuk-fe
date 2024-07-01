import { PrismaClient, RallyStatus } from '@prisma/client';

const prisma = new PrismaClient();

const dummyStamps: { [key: number]: string } = {
  0: '0000000/oR4DnVh0L-kzPRN_SpTSeG7dAE79IEoXOr-fn0usW1gj-FnjgfM07WVrlNxo54hoBSN8TN3akecyv5mIYY3Y6g.webp',
  1: '0000000/med.png',
  2: '0000000/3.284c1fc0..png',
  3: '0000000/artms-dall-Cover-Art.webp',
  4: '0000000/v0rC3c6NAZgwgNoUaeEU5s692CYSas3aZ_vNM76ef8hpmPPp8gir7FYdI8HJ8wp2KWdUZWWBSIRoa8BB4B1nlQ.webp',
  5: '0000000/v0rC3c6NAZgwgNoUaeEU5s692CYSas3aZ_vNM76ef8hpmPPp8gir7FYdI8HJ8wp2KWdUZWWBSIRoa8BB4B1nlQ.webp',
  6: '0000000/W0PzPa72o5SQPEnxAQSlfLJqlR-f_3GNuimqX9utrXTXiX1x7vaE3j-U-IfdZ5FHSSu7twBIU7YnNCblGlsKLQ.webp',
};

function generateRandomTag() {
  const possibleTags = [
    '태그테스트',
    '🚀랠리',
    '솨솨뫄뫄',
    'StampRally',
    'ab',
    '10글자짜리게임이름',
    '테스트TEST',
    '6일_챌린지',
    '작심삼일이두번이면끝',
    '多言語対応ーテスト',
  ];

  const tagCount = Math.floor(Math.random() * 4);
  const tags = [];

  while (tags.length < tagCount) {
    const tag = possibleTags[Math.floor(Math.random() * possibleTags.length)];
    tags.push(tag);
  }

  return tags;
}

export function pickRandomIndex() {
  const randomIndex = Math.floor(Math.random() * 7);
  return randomIndex;
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
        name: `User${index + 1}`,
        image: 'https://picsum.photos/360',
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
    const thumbnailIndex = pickRandomIndex();
    const rewardIndex = pickRandomIndex();

    return prisma.kit.create({
      data: {
        id: String(index + 1).padStart(7, '0'),
        title: `키트 ${index + 1}`,
        description: `${index + 1}번 키트의 설명입니다.`,
        thumbnailImage: dummyStamps[pickRandomIndex()],
        rewardImage: dummyStamps[pickRandomIndex()],
        blurredImage: dummyStamps[6],
        tags,
        uploaderId: users[Math.floor(Math.random() * users.length)].id,
        stamps: {
          create: [
            { objectKey: dummyStamps[thumbnailIndex] },
            ...Array.from({ length: 4 }, (_, stampIndex) => ({
              objectKey: dummyStamps[stampIndex],
            })),
            { objectKey: dummyStamps[rewardIndex] },
          ],
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
