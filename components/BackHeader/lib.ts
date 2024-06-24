export const getInfoFromPath = ({ path }: { path: string }) => ({
  title: getTitleFromPath(path),
  back: getBackPath(path),
});

const getBackPath = (path: string) => path.split('/').slice(0, -1).join('/') || '/';

const TITLE_MAP = new Map<string, RegExp>([
  ['root', /^\/$/],
  ['my-settings', /^\/my\/settings$/],
  ['kit-new', /^\/kits\/new$/],
  ['rally-start', /^\/kits\/[^\/]+\/start$/],
  ['kit', /^\/kits\/[^\/]+$/],
  ['rallies', /^\/rallies$/],
  ['rally-ongoing', /^\/rallies\/[^\/]+$/],
]);

function getTitleFromPath(path: string) {
  // /my/settings
  if (path.match(TITLE_MAP.get('my-settings')!)?.[0]) return '유저 설정';
  // /kits/new
  if (path.match(TITLE_MAP.get('kit-new')!)?.[0]) return '키트 업로드';
  // /kits/[id]/start
  if (path.match(TITLE_MAP.get('rally-start')!)?.[0]) return '랠리 시작하기';
  // /kits/[id]
  if (path.match(TITLE_MAP.get('kit')!)?.[0]) return '스탬프 랠리';
  // /rallies/[id]
  if (path.match(TITLE_MAP.get('rally-ongoing')!)?.[0]) return '스탬프 랠리 진행중';
  // /rallies
  if (path.match(TITLE_MAP.get('rallies')!)?.[0]) return '진행중인 랠리';
  // 경로의 제목이 정의되지 않은 경우
  return '타이틀이 지정되지 않았습니다.';
}
