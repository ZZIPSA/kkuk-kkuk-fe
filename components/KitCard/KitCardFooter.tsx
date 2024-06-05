import { CardDescription, CardFooter } from '@/components/ui/card';
import { getConditions, getStyles } from './lib';
import { KitCardVariants } from './types';

interface KitCardFooterProps {
  variant: KitCardVariants;
  description: string;
}
export default function KitCardFooter({ variant, description }: KitCardFooterProps) {
  const styles = getStyles(getConditions(variant));
  return (
    <CardFooter className={styles.footer}>
      <CardDescription className={styles.footerDescription}>{description}</CardDescription>
    </CardFooter>
  );
}
