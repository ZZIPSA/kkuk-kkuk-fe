import { NextResponse } from 'next/server';

export const NotFoundRallyError = NextResponse.json({ error: '해당 랠리를 찾을 수 없습니다.' }, { status: 404 });
export const NotFoundKitError = NextResponse.json({ error: '해당 키트를 찾을 수 없습니다.' }, { status: 404 });
export const ServerError = NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
export const UnauthorizedError = NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });
export const BadRequestError = NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
export const StampLimitError = NextResponse.json({ error: '더 이상 스탬프를 찍을 수 없습니다.' }, { status: 400 });
