'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { styles, buttons } from './lib';

export default function Buttons() {
  return (
    <div className={styles.buttons}>
      <Link href={buttons[0].href} className={buttons[0].className}>
        {buttons[0].label}
      </Link>
      <button onClick={() => toast('관리자에게 문의해주세요.')} className={buttons[1].className}>
        {buttons[1].label}
      </button>
    </div>
  );
}
