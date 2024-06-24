export const getInfo = ({ path }: { path: string }) => ({
  title: getTitle(path),
  back: getBack(path),
});

const getBack = (path: string) => path.split('/').slice(0, -1).join('/') || '/';

function getTitle(path: string) {
  switch (path) {
    // /my/settings
    case path.match(/\/my\/settings.*/)?.[0]:
      return '유저 설정';
    // /kits/new
    case path.match(/\/kits\/new/)?.[0]:
      return '키트 업로드';
    // /kits/[id]/start
    case path.match(/\/kits\/[^\/]+\/start/)?.[0]:
      return '랠리 시작하기';
    // /kits/[id]
    case path.match(/\/kits\/[^\/]+/)?.[0]:
      return '스탬프 랠리';
    // /rallies/[id]
    case path.match(/\/rallies\/[^\/]+/)?.[0]:
      return '스탬프 랠리 진행중';
    // /rallies
    case path.match(/\/rallies/)?.[0]:
      return '진행중인 랠리';
    // 경로가 정의되지 않은 경우
    default:
      return '타이틀이 지정되지 않았습니다.';
  }
}
