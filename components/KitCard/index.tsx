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
  /**
   * The uploader of the kit.
   */
  uploader: { nickname: string; profileImage: string | null };
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
  const nickname = uploader?.nickname ?? '';
  const profileImage = uploader?.profileImage ?? DEFAULT_PROFILE;
  return (
    <Card
      className={cn(
        'border-0 shadow-none gap-2',
        {
          'flex flex-col h-full': variant === KitCardVariants.vertical,
          flex: variant === KitCardVariants.horizontal,
          'grid grid-cols-2 gap-y-6 px-4 py-6': variant === KitCardVariants.description,
        },
        className,
      )}
      {...props}
    >
      <CardHeader className="p-0">
        <Image
          src={thumbnailImage}
          alt={title}
          width={100}
          height={100}
          className="border-black/20 border rounded-md aspect-square w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2 h-full">
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
            <AvatarImage src={profileImage} alt={nickname} />
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>
          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#A69C98] text-xs">{nickname}</span>
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
      </CardContent>
      {variant === KitCardVariants.description && description && (
        <CardFooter className="col-span-full bg-grey-50 px-4 py-2 rounded-xl">
          <CardDescription className="text-grey-300">{description}</CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
