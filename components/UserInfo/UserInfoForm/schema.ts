import { z } from 'zod';

const formSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, {
      message: '닉네임은 2글자 이상이어야 합니다.',
    })
    .max(12, {
      message: '닉네임은 12글자 이하이어야 합니다.',
    }),
  description: z.string().max(160, {
    message: '자기소개는 160글자 이하이어야 합니다.',
  }),
});

export default formSchema;
