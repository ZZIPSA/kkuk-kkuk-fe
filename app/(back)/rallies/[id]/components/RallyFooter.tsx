'use client';

import { notFound, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stamp } from '@/lib/icons';
import { getFooterConditions, getFooterVariant, getFooterContent, getFooterStyles } from './lib';
import { RallyFooterInfo } from './types';

interface RallyFooterProps extends RallyFooterInfo {
  rallyId: string;
}

export default function RallyFooter(props: RallyFooterProps) {
  const router = useRouter();
  const rallyId = props.rallyId;

  const content = getFooterContent(props);
  const is = getFooterVariant(getFooterConditions(props));
  const styles = getFooterStyles(is);

  const onClick = async () => {
    const response = await fetch(`/api/rallies/${rallyId}/stamp`, {
      method: 'PATCH',
    });
    if (response.ok) {
      router.refresh();
    } else {
      // TODO: 에러페이지 대응
      return notFound();
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
