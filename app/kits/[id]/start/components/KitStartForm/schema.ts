import { z } from 'zod';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: '랠리 목표는 2글자 이상이어야 합니다.',
    })
    .max(20, {
      message: '랠리 목표는 20글자 이하이어야 합니다.',
    }),
  description: z.string().max(200, {
    message: '랠리 설명은 200글자 이하이어야 합니다.',
  }),
});

export default formSchema;
