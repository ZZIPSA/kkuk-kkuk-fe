import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MenuTabProps } from './types';

export default function MenuTab({ label, href, path }: MenuTabProps) {
  return (
    <Link
      href={href}
      className={cn('pb-2 px-2 transition duration-200', {
        'font-bold text-primary border-b-2 border-primary z-10': path === href,
        'text-grey-200': path !== href,
      })}
    >
      {label}
    </Link>
  );
}
