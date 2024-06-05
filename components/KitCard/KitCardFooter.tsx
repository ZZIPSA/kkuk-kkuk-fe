import { CardDescription, CardFooter } from '@/components/ui/card';
import { getConditions, getFooterStyles } from './lib';
import { KitCardVariants } from './types';

interface KitCardFooterProps {
  variant: KitCardVariants;
  description: string;
}
export default function KitCardFooter({ variant, description }: KitCardFooterProps) {
  const styles = getFooterStyles(getConditions(variant));
  return (
    <CardFooter className={styles.footer}>
      <CardDescription className={styles.description}>{description}</CardDescription>
    </CardFooter>
  );
}
