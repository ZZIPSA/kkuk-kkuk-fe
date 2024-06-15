import { z } from 'zod';
import { MAXIMUM_TAGS } from '@/lib/constants';

/**
 * https://github.com/ZZIPSA/kkuk-kkuk-fe/wiki/Specs
 *
 *  제목 : 공백포함 2~20자 / 필수
 *  설명 : 공백포함 0~200자
 *  태그 : 공백미포함 2~10자 / 공백불가 / 밑줄(_), 하이픈(-)만 사용가능 / 최대 6개?까지
 */
export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
    .max(20, { message: '이름은 20자를 넘을 수 없습니다.' }),
  description: z.string().max(200, { message: '설명은 200자를 넘을 수 없습니다.' }).optional(),
  tags: z
    .object({
      name: z
        .string()
        .min(2, { message: '태그는 최소 2자 이상이어야 합니다.' })
        .max(10, { message: '태그는 10자를 넘을 수 없습니다.' })
        .regex(/^[\w-_]+$/, { message: '태그는 밑줄(_)과 하이픈(-)만 사용할 수 있습니다.' }),
    })
    .array()
    .max(MAXIMUM_TAGS, { message: '태그는 최대 6개까지 입력할 수 있습니다.' })
    .optional(),
  stamps: z
    .object({
      url: z.string(),
      blob: z.string(),
    })
    .array()
    .length(6),
});
