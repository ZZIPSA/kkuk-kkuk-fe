import { Card } from '@/components/ui/card';
import { KitCardInfo } from '@/types/Kit';
import { getConditions, getDefaults, getContainerStyles } from './lib';
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
  uploader: rawUploader,
  variant = KitCardVariants.vertical,
  description,
  ...props
}: KitCardProps) {
  const { thumbnail, uploader } = getDefaults({ thumbnailImage, uploader: rawUploader });
  const is = getConditions(variant);
  const styles = getContainerStyles(is);
  return (
    <Card className={styles.container} {...props}>
      <KitCardHeader thumbnail={thumbnail} title={title} variant={variant} />
      <KitCardContent title={title} tags={tags} uploader={uploader} variant={variant} />
      {(is.description || is.StartPage) && description && <KitCardFooter variant={variant} description={description} />}
    </Card>
  );
}
export { KitCardVariants };
