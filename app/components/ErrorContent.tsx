import { ErrorIcon } from '@/lib/icons';
import { errorButtonStyles, errorIconStyles, errorMainBodyStyles, errorTitleStyles } from './styles';

export default function ErrorContent() {
  return (
    <main className={errorMainBodyStyles}>
      <ErrorIcon className={errorIconStyles} />
      <h1 className={errorTitleStyles}>문제가 발생했습니다.</h1>
      <p>
        새로고침해도 문제가 지속될 시,
        <br />
        운영자에게 문의해주시기 바랍니다.
      </p>
      <button className={errorButtonStyles}>팀 ㅈIPSA 트위터 확인하기</button>
    </main>
  );
}
