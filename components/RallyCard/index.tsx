import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DEFAULT_KIT_THUMBNAIL } from '@/lib/constants';
import { MyRally, JoinedRally, CompletedRally } from '@/types/Rally';

type RallyCardProps = Pick<MyRally['kit'], 'thumbnailImage' | 'title'> &
  Partial<Pick<CompletedRally, 'updatedAt'>> &
  Partial<Pick<JoinedRally['kit'], 'stamps'>> &
  Partial<Pick<JoinedRally, 'stampCount'>>;

export default function RallyCard({ thumbnailImage: thumb, title, stamps, stampCount: count, updatedAt: completedAt }: RallyCardProps) {
  thumb ??= DEFAULT_KIT_THUMBNAIL;
  const total = stamps?.length;
  const intl = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'short' });

  return (
    <Card className="border-0 shadow-none flex flex-col gap-2">
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={encodeURI(`/api/image/${thumb}`)}
          alt={title}
          className="border-black/20 border rounded-md w-full h-full object-cover"
          fill
          sizes="360"
          priority
        />
      </CardHeader>
      <CardContent className="p-0">
        <CardDescription className="text-xs text-foreground">
          {total && `진행 상황: ${count} / ${total}`}
          {completedAt && `완료일: ${intl.format(new Date(completedAt))}`}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardFooter>
    </Card>
  );
}
