import Image from 'next/image';
import { CardHeader } from '@/components/ui/card';
import { getConditions, getHeaderStyles } from './lib';
import { KitCardVariants } from './types';

interface KitCardHeaderProps {
  thumbnail: string;
  title: string;
  variant: KitCardVariants;
}
export default function KitCardHeader({ thumbnail, title, variant }: KitCardHeaderProps) {
  const styles = getHeaderStyles(getConditions(variant));
  return (
    <CardHeader className={styles.header}>
      <Image src={thumbnail} alt={title} fill className={styles.thumbnail} />
    </CardHeader>
  );
}
