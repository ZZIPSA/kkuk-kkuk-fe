import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DEFAULT_KIT_THUMBNAIL, DEFAULT_PROFILE } from '@/lib/constants';
import { Tag } from '@/stories/Tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KitCardInfo } from '@/types/Kit';
import { Bookmark, Heart } from '@/lib/icons';

export enum KitCardVariants {
  vertical = 'vertical',
  horizontal = 'horizontal',
  description = 'description',
}

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
  className,
  description,
  ...props
}: KitCardProps) {
  thumbnailImage ??= DEFAULT_KIT_THUMBNAIL;
  const name = uploader?.name ?? '';
  const image = uploader?.image ?? DEFAULT_PROFILE;
  return (
    <Card
      className={cn(
        'border-0 shadow-none gap-2',
        {
          'flex flex-col h-full': variant === KitCardVariants.vertical,
          'flex justify-between gap-2 w-full': variant === KitCardVariants.horizontal,
          'grid grid-cols-2 gap-y-6 px-4 py-6': variant === KitCardVariants.description,
        },
        className,
      )}
      {...props}
    >
      <CardHeader className={cn('p-0 relative aspect-square w-full shrink-0')}>
        <Image src={thumbnailImage} alt={title} fill className="border-black/20 border rounded-md aspect-square w-full h-full object-cover" />
      </CardHeader>
      <CardContent
        className={cn('p-0 flex flex-col gap-2 h-full', {
          'w-full': variant === KitCardVariants.horizontal,
        })}
      >
        <CardTitle className="overflow-hidden whitespace-nowrap overflow-ellipsis text-base">{title}</CardTitle>
        <div className="flex gap-2 overflow-x-auto w-full scrollbar-hide">
          {tags?.map((tag) => <Tag key={tag} label={tag} className="break-keep" />)}
        </div>
        <div
          className={cn('p-0 flex items-center gap-2', {
            'mt-auto': variant === KitCardVariants.vertical,
          })}
        >
          <Avatar className="items-center border border-grey-100 w-6 h-6">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#A69C98] text-xs">{name}</span>
        </div>
        {variant === KitCardVariants.description && (
          <div className="flex justify-end gap-2 mt-auto">
            <button className="border border-grey-200 bg-grey-50 rounded-full w-10 aspect-square">
              <Bookmark className="w-6 h-6 stroke-none fill-grey-100 m-auto" />
            </button>
            <button className="border border-grey-200 bg-grey-50 rounded-full w-10 aspect-square">
              <Heart className="w-6 h-6 stroke-none fill-grey-100 m-auto" />
            </button>
          </div>
        )}
        {variant === KitCardVariants.horizontal && description && (
          <CardDescription className="text-grey-300 bg-grey-50 px-4 py-2 rounded-xl">{description}</CardDescription>
        )}
      </CardContent>
      {variant === KitCardVariants.description && description && (
        <CardFooter className="col-span-full bg-grey-50 px-4 py-2 rounded-xl">
          <CardDescription className="text-grey-300">{description}</CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
