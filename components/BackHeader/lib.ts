export const getInfo = ({ path }: { path: string }) => ({
  title: getTitle(path),
  back: getBack(path),
});

const getBack = (path: string) => path.split('/').slice(0, -1).join('/') || '/';

function getTitle(path: string) {
  // /my/settings
  if (path.match(/\/my\/settings.*/)?.[0]) return '유저 설정';
  // /kits/new
  if (path.match(/\/kits\/new/)?.[0]) return '키트 업로드';
  // /kits/[id]/start
  if (path.match(/\/kits\/[^\/]+\/start/)?.[0]) return '랠리 시작하기';
  // /kits/[id]
  if (path.match(/\/kits\/[^\/]+/)?.[0]) return '스탬프 랠리';
  // /rallies/[id]
  if (path.match(/\/rallies\/[^\/]+/)?.[0]) return '스탬프 랠리 진행중';
  // /rallies
  if (path.match(/\/rallies/)?.[0]) return '진행중인 랠리';
  // 경로의 제목이 정의되지 않은 경우
  return '타이틀이 지정되지 않았습니다.';
}
