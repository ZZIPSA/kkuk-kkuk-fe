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
  console.log({ activeRallies });
  const inactiveRallies = await prisma.rally.createMany({
    data: kits
      .filter((_, i) => 20 <= i && i < 40)
      .map((kit, i) => ({
        starterId: user.id,
        kitId: kit.id,
        title: `완료 랠리 ${kit.title}`,
        updatedAt: new Date(2024, 4, i - 20),
        status: RallyStatus.inactive,
      })),
  });
  console.log({ inactiveRallies });
  const { id } = kits.at(-1)!;
  const uploadKits = await prisma.kit.createMany({
    data: Array.from({ length: 20 }, (_, i) => ({
      id: (Number(id) + i + 1).toString().padStart(7, '0'),
      title: `업로드 키트 ${i + 1}`,
      description: `${i + 1}번 업로드 키트 설명`,
      thumbnailImage: `https://picsum.photos/${360 + i}`,
      rewardImage: `https://picsum.photos/${360 + i}`,
      uploaderId: user.id,
    })),
  });
  console.log({ uploadKits });
}

main();
