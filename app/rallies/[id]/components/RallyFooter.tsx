'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stamp } from '@/lib/icons';
import { getFooterConditions, getFooterVariant, getFooterContent, getFooterStyles } from './lib';
import { RallyFooterInfo } from './types';

interface RallyFooterProps extends RallyFooterInfo {
  /*
  stampCount: number;
  total: number;
  owned: boolean;
  status: RallyStatus;
  isStampedToday: boolean;
  */
}

export function RallyFooter(props: RallyFooterProps) {
  const router = useRouter();
  const path = usePathname();
  const rallyId = path.split('/').at(-1);

  const content = getFooterContent(props);
  const is = getFooterVariant(getFooterConditions(props));
  const styles = getFooterStyles(is);

  const onClick = async () => {
    const response = await fetch(`/api/rallies/${rallyId}`, {
      method: 'PATCH',
    });
    if (response.ok) {
      router.refresh();
    } else {
      // TODO: 에러 페이지로 이동
      console.error('에러가 발생했습니다.');
    }
  };

  return (
    <footer className={styles.footer}>
      <Button className={styles.shareButton}>친구에게 공유하기</Button>
      <Button disabled={is.disabled} className={styles.stampButton} onClick={onClick}>
        {(is.stampable || is.reward) && <Stamp className={styles.stampIcon} />}
        {content}
      </Button>
    </footer>
  );
}
