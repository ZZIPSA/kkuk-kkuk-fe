import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tag } from '@/stories/Tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KitCardInfo } from '@/types/Kit';
import { Bookmark, Heart } from '@/lib/icons';
import { getConditions, getDefault, getStyles } from './lib';
import { KitCardVariants } from './types';

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
  const styles = getStyles(is);
  return (
    <Card className={styles.container} {...props}>
      <CardHeader className={styles.header}>
        <Image src={thumbnail} alt={title} fill className={styles.thumbnail} />
      </CardHeader>
      <CardContent className={styles.content}>
        <CardTitle className={styles.title}>{title}</CardTitle>
        <div className={styles.tags}>{tags?.map((tag) => <Tag key={tag} label={tag} className={styles.tag} />)}</div>
        <div className={styles.uploader}>
          <Avatar className={styles.avatar}>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <span className={styles.name}>{name}</span>
        </div>
        {is.description && (
          <div className={styles.buttons}>
            <button className={styles.button}>
              <Bookmark className={styles.bookmark} />
            </button>
            <button className={styles.button}>
              <Heart className={styles.heart} />
            </button>
          </div>
        )}
        {is.StartPage && description && <CardDescription className={styles.description}>{description}</CardDescription>}
      </CardContent>
      {is.description && description && (
        <CardFooter className={styles.footer}>
          <CardDescription className={styles.footerDescription}>{description}</CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
export { KitCardVariants };
