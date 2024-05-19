import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DEFAULT_USER_NICKNAME, DEFAULT_PROFILE } from '@/lib/defaults';
import { Tag } from '@/stories/Tag';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KitCardInfo } from '@/types/kit';

interface KitCardProps extends KitCardInfo, React.ComponentPropsWithoutRef<typeof Card> {
  id: string;
  title: string;
  thumbnailImage: string | null;
  tags: string[];
  uploader: { nickname: string | null; profileImage: string | null } | null;
}

export default function KitCard({ id, title, thumbnailImage, tags, uploader, className, ...props }: KitCardProps) {
  thumbnailImage ??= DEFAULT_PROFILE;
  const nickname = uploader?.nickname ?? DEFAULT_USER_NICKNAME;
  const profileImage = uploader?.profileImage ?? DEFAULT_PROFILE;
  return (
    <Card className={cn('flex flex-col border-0 shadow-none gap-2', className)} {...props}>
      <Link href={`/kits/${id}`} passHref>
        <CardHeader className="p-0">
          <Image
            src={thumbnailImage}
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
          <AvatarImage src={profileImage} alt={nickname} />
          <AvatarFallback>{nickname}</AvatarFallback>
        </Avatar>
        <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#A69C98] text-xs">{nickname}</span>
      </CardFooter>
    </Card>
  );
}
