import { NextRequest, NextResponse } from 'next/server';
import { pipe, prop } from '@fxts/core';
import { Prisma } from '@prisma/client';
import { ServerError } from '@/app/api/lib/errors';
import { prisma } from '@/app/api/lib/prisma';
import { getAll } from '@/app/api/lib/utils';
import { bind, bindTo, Do, remain } from '@/lib/do';

export async function GET(request: NextRequest) {
  try {
    return pipe(
      request,
      getSearchParams, // URLSearchParams 추출
      getParams, // tag 파라미터 추출
      bindArgs, // prisma.kit.findMany에 전달할 인자 생성
      prisma.kit.count, // DB 조회
      bindTo('data'), // { data: prisma.kit.findMany }
      NextResponse.json,
    );
  } catch (error) {
    console.error(error);
    return ServerError;
  }
}
const getSearchParams = (request: NextRequest) =>
  pipe(
    request,
    prop('nextUrl'), // URL
    prop('searchParams'), // URLSearchParams
  );
const getParams = (params: URLSearchParams): Tags =>
  pipe(
    Do,
    bind('tags', () => getAll('tag')(params)),
  );
interface Tags {
  tags: string[];
}
const bindArgs = (props: Tags): Prisma.KitCountArgs =>
  pipe(
    props,
    bind('where', getWhere), // where 생성
    remain(['where']),
  );
const getWhere = ({ tags }: { tags: string[] }): Prisma.KitCountArgs['where'] => ({ tags: { hasEvery: tags }, deletedAt: null });
