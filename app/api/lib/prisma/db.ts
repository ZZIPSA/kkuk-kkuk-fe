import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  result: {
    rally: {
      stampable: {
        needs: { lastStampDate: true },
        compute(rally) {
          if (!rally.lastStampDate) return true;

          const currentDate = new Date();
          const targetDate = new Date(rally.lastStampDate);

          const fiveAMToday = new Date(currentDate);
          fiveAMToday.setHours(5, 0, 0, 0);

          return targetDate < fiveAMToday;
        },
      },
    },
  },
});

export default prisma;
