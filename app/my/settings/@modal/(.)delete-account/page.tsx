import Link from 'next/link';
import { SadCat } from '@/lib/icons';
import { styles, buttons, hrefs } from './lib';

export default function DeleteAccountModal() {
  return (
    <>
      <Backdrop />
      <article className={styles.container}>
        <SadCat className={styles.icon} />
        <Description />
        <Buttons />
      </article>
    </>
  );
}

function Backdrop() {
  return <Link href={hrefs.backdrop} className={styles.backdrop} />;
}

function Description() {
  return (
    <p className={styles.text}>
      <h1 className={styles.title}>정말로 탈퇴 하시겠어요? </h1>
      <br />
      회원 탈퇴시 참여했던 랠리 및<br /> 세트 목록은 복구 불가능해요!
    </p>
  );
}

function Buttons() {
  return (
    <div className={styles.buttons}>
      {buttons.map(({ key, className, label, href }) => (
        <Link href={href} key={key} className={className}>
          {label}
        </Link>
      ))}
    </div>
  );
}
