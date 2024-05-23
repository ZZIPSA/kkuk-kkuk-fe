import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DEFAULT_KIT_THUMBNAIL } from '@/lib/constants';
import { MyRally } from '@/types/Rally';
import Image from 'next/image';

type RallyCardProps = Pick<MyRally, 'stampCount'> & Pick<MyRally['kit'], 'thumbnailImage' | 'title'> & Pick<MyRally['kit']['_count'], 'stamps'>;

export default function RallyCard({ stampCount: count, thumbnailImage: thumb, title, stamps: total }: RallyCardProps) {
  thumb ??= DEFAULT_KIT_THUMBNAIL;
  return (
    <Card className="border-0 shadow-none flex flex-col gap-2">
      <CardHeader className="p-0">
        <Image
          src={thumb}
          alt={title}
          width={100}
          height={100}
          className="border-black/20 border rounded-md aspect-square w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-0">
        <CardDescription className="text-xs text-foreground">
          진행 상황: {count} / {total}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardFooter>
    </Card>
  );
}
