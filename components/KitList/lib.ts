import { isEmpty, last, pipe } from '@fxts/core';
import { resolveData } from '@/lib/response';
import { bind, Do } from '@/lib/do';
import { KitResult } from '@/types/Kit';

/** API로부터 커서를 받아 키트를 가져오는 함수를 생성합니다. */
export const fetchKitsFrom = (api: string) => (params: { cursor: string }) =>
  pipe(
    Do,
    bind('path', () => addAmpOrQuestion(api)),
    bind('params', () => paramsToString(params)),
    joinPathParams, // api에 파라미터 추가
    fetch, // 요청
    resolveData<KitResult[]>, // JSON으로 변환 후 데이터 추출
  );

/** API 에 ? 가 있으면 이미 쿼리가 존재하는 것으로 판단하여 & 붙입니다. 없으면 ? 를 붙여 쿼리를 붙일 수 있도록 만듭니다. */
const addAmpOrQuestion = (api: string) => (api.includes('?') ? `${api}&` : `${api}?`);
/** 파라미터 레코드를 쿼리로 변경합니다. */
const paramsToString = (params: Record<string, string>) => new URLSearchParams(params).toString();
/** API와 쿼리를 합칩니다. */
const joinPathParams = ({ path, params }: { path: string; params: string }) => `${path}${params}`;

/** 마지막 키트의 id, 키트의 배열이 비었으면 빈 문자열을 반환합니다. */
export const getCursor = (kits: KitResult[]) => last(kits)?.id ?? '';
/** 키트의 배열이 비어있는지 여부를 반환합니다. */
export const getEnd = isEmpty;
