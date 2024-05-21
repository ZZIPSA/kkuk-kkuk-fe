import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { notFoundedUserNickname, notFoundedImage } from '@/lib/notFound';
import { Tag } from '@/stories/Tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KitCardInfo } from '@/types/kit';
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
  thumbnailImage: string | null;
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
  uploader: { nickname: string | null; profileImage: string | null } | null;
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
  thumbnailImage ??= notFoundedImage;
  const nickname = uploader?.nickname ?? notFoundedUserNickname;
  const profileImage = uploader?.profileImage ?? notFoundedImage;
  return (
    <Card className={cn('h-full flex flex-col border-0 shadow-none gap-2', className)} {...props}>
      <CardHeader className="p-0">
        <Image
          src={thumbnailImage}
          alt={title}
          width={100}
          height={100}
          className="border-black/20 border rounded-md aspect-square w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2">
        <CardTitle className="overflow-hidden whitespace-nowrap overflow-ellipsis text-base">{title}</CardTitle>
        <div className="flex gap-2 overflow-x-auto w-full scrollbar-hide">
          {tags?.map((tag) => <Tag key={tag} label={tag} className="break-keep" />)}
        </div>
        <div className="p-0 flex items-center gap-2 mt-auto">
          <Avatar className="items-center border border-grey-100 w-6 h-6">
            <AvatarImage src={profileImage} alt={nickname} />
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>
          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#A69C98] text-xs">{nickname}</span>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
