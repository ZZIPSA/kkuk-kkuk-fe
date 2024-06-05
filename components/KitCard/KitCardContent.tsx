import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Tag } from '@/stories/Tag';
import { Bookmark, Heart } from '@/lib/icons';
import { KitCardVariants } from './types';
import { getConditions, getStyles } from './lib';

interface KitCardContentProps  {
  title: string;
  tags: string[];
  name: string;
  image: string;
  variant: KitCardVariants;
  description?: string;
}

export default function KitCardContent({
  title,
  tags,
  name,
  image,
  variant,
  description,
}:
  KitCardContentProps
) {
  const is = getConditions(variant);
  const styles = getStyles(is);
  return (
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
  );
}
