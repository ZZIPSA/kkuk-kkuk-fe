import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tag } from '@/stories/Tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KitCardInfo } from '@/types/Kit';
import { Bookmark, Heart } from '@/lib/icons';
import { kitCardContainerStyles, kitCardHeaderStyles, kitCardContentStyles, kitCardFooterStyles } from './styles';
import { getConditions, getDefault } from './lib';
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
  return (
    <Card
      className={cn(kitCardContainerStyles.default, {
        [kitCardContainerStyles.vertical]: is.vertical,
        [kitCardContainerStyles.StartPage]: is.StartPage,
        [kitCardContainerStyles.description]: is.description,
      })}
      {...props}
    >
      <CardHeader
        className={cn(kitCardHeaderStyles.default, {
          [kitCardHeaderStyles.notStartPage]: !is.StartPage,
          [kitCardHeaderStyles.startPage]: is.StartPage,
        })}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          className={cn({
            [kitCardHeaderStyles.thumbnail.notStartPage]: !is.StartPage,
            [kitCardHeaderStyles.thumbnail.startPage]: is.StartPage,
          })}
        />
      </CardHeader>
      <CardContent
        className={cn(kitCardContentStyles.default, {
          [kitCardContentStyles.startPage]: is.StartPage,
        })}
      >
        <CardTitle className={kitCardContentStyles.title.default}>{title}</CardTitle>
        <div className={kitCardContentStyles.tags.default}>
          {tags?.map((tag) => <Tag key={tag} label={tag} className={kitCardContentStyles.tags.tag.default} />)}
        </div>
        <div
          className={cn(kitCardContentStyles.uploader.default, {
            [kitCardContentStyles.uploader.vertical]: is.vertical,
          })}
        >
          <Avatar className={kitCardContentStyles.uploader.avatar.default}>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <span className={kitCardContentStyles.uploader.name.default}>{name}</span>
        </div>
        {is.description && (
          <div className={kitCardContentStyles.buttons.default}>
            <button className={kitCardContentStyles.buttons.button.default}>
              <Bookmark className={kitCardContentStyles.buttons.button.bookmark} />
            </button>
            <button className={kitCardContentStyles.buttons.button.default}>
              <Heart className={kitCardContentStyles.buttons.button.heart} />
            </button>
          </div>
        )}
        {is.StartPage && description && <CardDescription className={kitCardContentStyles.description.StartPage}>{description}</CardDescription>}
      </CardContent>
      {is.description && description && (
        <CardFooter className={kitCardFooterStyles.default}>
          <CardDescription className={kitCardFooterStyles.description.default}>{description}</CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
export { KitCardVariants };
