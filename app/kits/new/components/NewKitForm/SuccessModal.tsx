import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import { AUTO_TWEET, DOMAIN } from '@/lib/constants';
import { Paw } from '@/lib/icons';

export default function SuccessModal({ id }: { id: string }) {
  if (!id) return null;
  return (
    <dialog className={styles.dialog}>
      <section className={styles.section}>
        <Paw width={72} height={72} />
        <p>
          <h2 className="pb-2 text-xl font-bold text-foreground">키트가 만들어졌어요!</h2>
          이제 친구와 스탬프 랠리가 가능합니다!
        </p>
        <hr className={styles.hr} />
        <div className={styles.grid}>
          <span className={styles.span}>SNS로 키트 공유</span>
          <Link
            href={`https://twitter.com/intent/tweet?text=${AUTO_TWEET}&hashtags=${'꾹꾹,kookkook'}&url=${encodeURI(DOMAIN + '/kits/' + id)}`}
            className={styles.twitter}
          >
            𝕏
          </Link>
          <button onClick={() => navigator.clipboard.writeText(DOMAIN + '/kits/' + id)} className={styles.button}>
            <LinkIcon width={24} height={24} className="m-auto" />
          </button>
          <Link href="/" className={styles.link}>
            홈으로
          </Link>
          <Link href={`/kits/${id}`} className={styles.link2}>
            키트 보러가기
          </Link>
        </div>
      </section>
    </dialog>
  );
}

const styles = {
  dialog: 'fixed top-0 left-0 w-full h-full bg-foreground/20 text-foreground backdrop-blur-sm z-50 ease-in flex justify-center items-center',
  section: 'w-[328px] bg-background rounded-xl p-6 flex flex-col gap-6 items-center justify-stretch text-center text-sm text-foreground/60',
  hr: 'border-0.5 w-full',
  grid: 'grid grid-cols-2 gap-y-4 gap-x-2 w-full text-center',
  span: 'col-span-2',
  button: 'bg-foreground/5 text-foreground border rounded-full size-9 place-self-start',
  twitter: 'bg-foreground text-background rounded-full size-9 text-2xl p-1.5 place-self-end',
  link: 'bg-background text-foreground border rounded-xl w-full py-4',
  link2: 'bg-primary text-white rounded-xl w-full py-4',
};
