import { PrismaClient, RallyStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirstOrThrow({});
  const kits = await prisma.kit.findMany({});
  const activeRallies = await prisma.rally.createMany({
    data: kits
      .filter((_, i) => i < 20)
      .map((kit) => ({
        starterId: user.id,
        kitId: kit.id,
        title: `참여 중 랠리 ${kit.title}`,
        status: RallyStatus.active,
      })),
  });
  console.log('=== active rallies ===');
  console.log({ activeRallies });
  const inactiveRallies = await prisma.rally.createMany({
    data: kits
      .filter((_, i) => 20 <= i && i < 40)
      .map((kit, i) => ({
        starterId: user.id,
        kitId: kit.id,
        stampCount: 6,
        title: `완료 랠리 ${kit.title}`,
        updatedAt: new Date(2024, 4, i - 20),
        status: RallyStatus.inactive,
      })),
  });
  console.log('=== inactive rallies ===');
  console.log({ inactiveRallies });
  const { id } = kits.at(-1)!;
  const uploadKits = await prisma.kit.createMany({
    data: Array.from({ length: 20 }, (_, i) => ({
      id: (Number(id) + i + 1).toString().padStart(7, '0'),
      title: `업로드 키트 ${i + 1}`,
      blurredImage: '0000000/oR4DnVh0L-kzPRN_SpTSeG7dAE79IEoXOr-fn0usW1gj-FnjgfM07WVrlNxo54hoBSN8TN3akecyv5mIYY3Y6g.webp',
      description: `${i + 1}번 업로드 키트 설명`,
      thumbnailImage: '0000000/oR4DnVh0L-kzPRN_SpTSeG7dAE79IEoXOr-fn0usW1gj-FnjgfM07WVrlNxo54hoBSN8TN3akecyv5mIYY3Y6g.webp',
      rewardImage: '0000000/oR4DnVh0L-kzPRN_SpTSeG7dAE79IEoXOr-fn0usW1gj-FnjgfM07WVrlNxo54hoBSN8TN3akecyv5mIYY3Y6g.webp',
      uploaderId: user.id,
    })),
  });
  console.log('=== upload kits ===');
  console.log({ uploadKits });
}

main();
