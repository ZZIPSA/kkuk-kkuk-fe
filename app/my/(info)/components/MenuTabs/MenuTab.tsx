import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MenuTabProps } from './types';

export default function MenuTab({ label, href, path }: MenuTabProps) {
  const isActive = path === href;
  return (
    <Link href={href} className={getStyles(isActive)}>
      {label}
    </Link>
  );
}

const getStyles = (isActive: boolean) =>
  cn(styles.default, {
    [styles.active]: isActive,
    [styles.inactive]: !isActive,
  });
const styles = {
  default: 'pb-2 px-2 transition duration-200',
  active: 'font-bold text-primary border-b-2 border-primary z-10',
  inactive: 'text-grey-200',
};
