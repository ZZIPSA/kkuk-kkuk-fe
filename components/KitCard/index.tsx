import { Card } from '@/components/ui/card';
import { KitCardInfo } from '@/types/Kit';
import { getConditions, getDefault, getContainerStyles } from './lib';
import { KitCardVariants } from './types';
import KitCardFooter from './KitCardFooter';
import KitCardContent from './KitCardContent';
import KitCardHeader from './KitCardHeader';

interface KitCardProps extends KitCardInfo, React.ComponentPropsWithoutRef<typeof Card> {
  /**
   * The unique identifier of the kit.
   */
  id: string;
  /**
   * The title of the kit.
   */
  title: string;
  /**
   * The thumbnail image of the kit.
   */
  thumbnailImage: string;
  /**
   * The tags of the kit.
   */
  tags: string[];
  /**
   * The description of the kit.
   */
  description?: string;
  /**
   * The variant of the kit card.
   * @default 'vertical'
   */
  variant?: KitCardVariants;
}

export default function KitCard({
  id,
  title,
  thumbnailImage,
  tags,
  uploader,
  variant = KitCardVariants.vertical,
  description,
  ...props
}: KitCardProps) {
  const { thumbnail, name, image } = getDefault({ thumbnailImage, ...uploader });
  const is = getConditions(variant);
  const styles = getContainerStyles(is);
  return (
    <Card className={styles.container} {...props}>
      <KitCardHeader thumbnail={thumbnail} title={title} variant={variant} />
      <KitCardContent title={title} tags={tags} name={name} image={image} variant={variant} description={description} />
      {is.description && description && <KitCardFooter variant={variant} description={description} />}
    </Card>
  );
}
export { KitCardVariants };
