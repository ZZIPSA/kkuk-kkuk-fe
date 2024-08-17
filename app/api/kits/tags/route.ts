import { NextRequest, NextResponse } from 'next/server';
import { evolve, pipe } from '@fxts/core';
import { Prisma } from '@prisma/client';
import { ServerError } from '@/app/api/lib/errors';
import { kitSelect, prisma } from '@/app/api/lib/prisma';
import { SortOrder } from '@/app/api/lib/types';
import { get, getAll, getSearchParams, parseTake } from '@/app/api/lib/utils';
import { bind, bindTo, Do, remain } from '@/lib/do';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    return pipe(
      request,
      getSearchParams, // URLSearchParams 추출
      getParams, // 개별 파라미터 추출
      parseParams, // 파라미터 파싱
      bindArgs, // prisma.kit.findMany에 전달할 인자 생성
      prisma.kit.findMany, // DB 조회
      bindTo('data'), // { data: prisma.kit.findMany }
      NextResponse.json,
    );
  } catch (error) {
    console.error(error);
    return ServerError;
  }
}

const getParams = (params: URLSearchParams): RawParams =>
  pipe(
    Do,
    bind('tags', () => getAll('tag')(params)),
    bind('take', () => get('pageSize')(params)),
    bind('cursor', () => get('cursor')(params)),
    bind('orderBy', () => get('order')(params)),
    bind('select', () => kitSelect),
  );
/**
 * 파싱 전 파라미터
 */
interface RawParams {
  tags: string[];
  take: string | null;
  cursor: string | null;
  orderBy: string | null;
  select: Prisma.KitSelect;
}
const parseParams = (params: RawParams): ParsedParams =>
  pipe(
    params,
    evolve({
      take: parseTake,
      cursor: parseCursor,
      orderBy: parseOrderBy,
    }),
  );
/** { id: string } 혹은 undefined */
const parseCursor = (cursor: string | null) => (cursor ? { id: cursor } : undefined);
/** { id: SortOrder } 혹은 undefined */
const parseOrderBy = (order: string | null) => ({ id: parseOrder(order) });
/** asc 라고 입력되면 asc, 그 외의 값은 desc */
const parseOrder = (order: string | null) => (order === 'asc' ? 'asc' : 'desc') as SortOrder;
/**
 * 파싱 후 파라미터
 */
interface ParsedParams {
  tags: string[];
  take: number;
  cursor: { id: string } | undefined;
  orderBy: { id: SortOrder };
  select: Prisma.KitSelect;
}
const bindArgs = (props: ParsedParams): Prisma.KitFindManyArgs =>
  pipe(
    props,
    bind('where', getWhere), // where 생성
    bind('skip', getSkip), // skip 생성
    remain(['skip', 'cursor', 'take', 'where', 'orderBy', 'select']),
  );
const getWhere = ({ tags }: { tags: string[] }): Prisma.KitFindManyArgs['where'] => ({ tags: { hasEvery: tags }, deletedAt: null });
const getSkip = ({ cursor }: { cursor?: { id: string } }) => (cursor ? 1 : 0);
