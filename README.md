# KKUK-KKUK Frontend

- [KKUK-KKUK Frontend](#kkuk-kkuk-frontend)
  - [Pages](#pages)

## About

- 스탬프랠리를 즐겁게 진행할 수 있도록 돕는 웹 앱 "꾹꾹"입니다.
- Next.js, Prisma, PostgreSQL, tailwind

## Pages

- `/`: 루트 페이지
- `/kits`: 전체 키트 조회
  - `/new`: 새로운 키트 생성 페이지
  - `/[kitId]`: 특정 키트 페이지
    - `/start`: 특정 키트를 통해 랠리 생성 페이지
- `/my`: 나의 정보
  - layout
  - `/joined`: 참가 중인 랠리 페이지
  - `/completed`: 완료한 랠리 페이지
  - `/created`: 생성한 키트 페이지
  - `/settings`: 개인 정보 수정 페이지

## Commands

### 실행 방법

#### 최초 실행시

아래의 커맨드를 순서대로 실행합니다.

- `$ yarn install`
- `$ yarn add sharp --ignore-engines`
- `$ docker-compose up -d`
- `$ npx prisma migrate reset`

#### 실행 커맨드

- `$ yarn dev`
