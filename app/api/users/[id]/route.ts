import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { always, evolve, filter, pipe, prop, toArray } from '@fxts/core';
import { prisma, userInfoSelect } from '@/app/api/lib/prisma';
import { assign, bind, bindTo, remain } from '@/lib/do';
import { lift, purify } from '@/lib/either';
import { notNull, tapLog } from '@/lib/utils';
import type { AccountData, UserData } from '@/types/User';
import { resolveJson } from '@/lib/response';

export const GET = async (_: Request, { params }: { params: { id: string } }): Promise<NextResponse<{ readonly data: UserData }>> =>
  pipe(
    params, // { id: string }
    getUserData, // 유저 정보 조회
    purifyUserData, // id 에 해당하는 유저 정보가 없으면 404
    filterPublicAccounts, // 공개된 계정만 필터링
    bindTo('data'), // { data: UserData }
    NextResponse.json, // JSON 형식으로 반환
  );

const getUserData = (id: { id: string }) =>
  pipe(
    id,
    bindTo('where'), // { where: { id: string } }
    bind('select', always(userInfoSelect)), // { where: { id: string }, select: userInfoSelect }
    prisma.user.findUnique, // DB 조회
  );
const purifyUserData = (user: UserData | null) =>
  pipe(
    user,
    lift<UserData | null, null, UserData>(notNull), // Left<null> | Right<UserData>
    purify(notFound), // Left<null> 이면 404
  );
const filterPublic = (accounts: AccountData[]) =>
  pipe(
    accounts,
    filter(prop('isPublic')), // isPublic === true 인 계정만 필터링
    toArray, // 이터레이터를 배열로 변환
  );
const filterPublicAccounts: (user: UserData) => UserData = evolve({ accounts: filterPublic });

export const PUT = async (req: Request, { params }: { params: { id: string } }) =>
  pipe(
    req,
    resolveJson<{ name: string /* description: string */ }>,
    remain(['name' /* , 'description' */]),
    bindTo('data'),
    bind('where', always(params)),
    prisma.user.update,
    NextResponse.json,
  );
