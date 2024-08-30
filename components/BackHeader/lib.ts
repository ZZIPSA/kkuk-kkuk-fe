export const getInfoFromPath = ({ path }: { path: string }) => ({
  title: getTitleFromPath(path),
  back: getBackPath(path),
});

const getBackPath = (path: string) => path.substring(0, path.lastIndexOf('/')) || '/';

const TITLE_MAP = new Map<string, RegExp>([
  ['root', /^\/$/],
  ['my-settings', /^\/my\/settings$/],
  ['kit-new', /^\/kits\/new$/],
  ['search-tags', /^\/kits\/tags$/],
  ['rally-start', /^\/kits\/[^\/]+\/start$/],
  ['kit', /^\/kits\/[^\/]+$/],
  ['rallies', /^\/rallies$/],
  ['rally-ongoing', /^\/rallies\/[^\/]+$/],
]);

function getTitleFromPath(path: string) {
  // /my/settings
  if (TITLE_MAP.get('my-settings')!.test(path)) return '유저 설정';
  // /kits/new
  if (TITLE_MAP.get('kit-new')!.test(path)) return '키트 업로드';
  // /kits/tags
  if (TITLE_MAP.get('search-tags')!.test(path)) return '태그 검색';
  // /kits/[id]/start
  if (TITLE_MAP.get('rally-start')!.test(path)) return '랠리 시작하기';
  // /kits/[id]
  if (TITLE_MAP.get('kit')!.test(path)) return '스탬프 키트';
  // /rallies/[id]
  if (TITLE_MAP.get('rally-ongoing')!.test(path)) return '스탬프 랠리';
  // /rallies
  if (TITLE_MAP.get('rallies')!.test(path)) return '진행중인 랠리';
  // 경로의 제목이 정의되지 않은 경우
  return '타이틀이 지정되지 않았습니다.';
}
