import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DEFAULT_PROFILE } from '@/lib/constants';
import { Tag } from '@/stories/Tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KitCardInfo } from '@/types/Kit';

type KitCardProps = KitCardInfo & React.HTMLAttributes<HTMLDivElement>;

export default function KitCard({ id, title, thumbnailImage, tags, uploader, className, ...props }: KitCardProps) {
  const profileImage = uploader?.profileImage ?? DEFAULT_PROFILE;
  const nickname = uploader?.nickname;
  return (
    <Card className={cn('flex flex-col border-0 shadow-none gap-2', className)} {...props}>
      <Link href={`/kits/${id}`} passHref>
        <CardHeader className="p-0">
          <Image
            src={thumbnailImage ?? ''}
            alt={title}
            width={100}
            height={100}
            className="border-black/20 border rounded-md aspect-square w-full h-full object-cover"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-0 flex flex-col gap-2">
        <CardTitle className="overflow-hidden whitespace-nowrap overflow-ellipsis text-base">{title}</CardTitle>
        <CardDescription className="flex gap-2 overflow-x-auto w-full scrollbar-hide">
          {tags?.map((tag) => <Tag key={tag} label={tag} className="break-keep" />)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-0 flex gap-2">
        <Avatar className="items-center border border-grey-100 w-6 h-6">
          <AvatarImage src={profileImage} alt={nickname ?? ''} />
          <AvatarFallback>{nickname}</AvatarFallback>
        </Avatar>
        <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#A69C98] text-xs">{nickname}</span>
      </CardFooter>
    </Card>
  );
}
