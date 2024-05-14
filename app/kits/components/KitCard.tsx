import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tag } from '@/stories/Tag';
import { Kit } from '@/types/kit';

type KitKeys = 'id' | 'title' | 'thumbnailImage' | 'tags' | 'uploader';
type KitCardProps = Pick<Kit, KitKeys> & React.ComponentPropsWithoutRef<typeof Card>;

export default function KitCard({ id, title, thumbnailImage, tags, uploader: { nickname }, className, ...props }: KitCardProps) {
  return (
    <Card className={cn('flex flex-col border-0 shadow-none', className)} {...props}>
      <Link href={`/kits/${id}`} passHref>
        <CardHeader className="p-0">
          <Image
            src={thumbnailImage}
            alt={title}
            width={100}
            height={100}
            className="border-gray-400 border rounded-md aspect-square w-full h-full object-cover"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-0">
        <CardTitle className="overflow-hidden whitespace-nowrap overflow-ellipsis">{title}</CardTitle>
        <CardDescription className="flex gap-2 overflow-x-auto w-full scrollbar-hide">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} className="break-keep" />
          ))}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <div className="flex justify-start items-center w-full">
          <Image
            src={thumbnailImage}
            alt={nickname}
            width={32}
            height={32}
            className="border-gray-400 border-2 rounded-full aspect-square w-8 h-8 object-cover mr-4"
          />
          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-muted-foreground">{nickname}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
