import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './constants';

export const FormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .min(3 /** 임의 지정 */, { message: '이름은 최소 3자 이상이어야 합니다.' })
    .max(30 /** 임의 지정 */, { message: '이름은 30자를 넘을 수 없습니다.' }),
  description: z.string().max(160 /** 임의 지정 */, { message: '설명은 160자를 넘을 수 없습니다.' }).optional(),
  tags: /** 임의 지정 */ z.array(z.string()).optional(),
  stamps: z
    .unknown()
    .transform((value) => value as FileList | null | undefined)
    .refine((files): files is FileList => (files ?? false) && true, {
      message: '스탬프를 업로드해주세요.',
    })
    .transform((files) => Array.from(files))
    .refine((files) => files.length === 6, {
      message: '6개의 이미지를 업로드해주세요.',
    })
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: '5MB 이하의 파일을 업로드해주세요.',
    })
    .refine((files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
      message: '이미지 파일을 업로드해주세요.',
    }),
});
