import Image from 'next/image';
import { RallyPreviewStamp } from '@/types/Stamp';

type StampPreviewProps = { stamps: RallyPreviewStamp[] };

export default function StampsPreview({ stamps }: StampPreviewProps) {
  return (
    <section className="bg-grey-50 px-4 pb-6 flex flex-col gap-4">
      <h2 className="font-bold">스탬프 목록</h2>
      <div className="grid grid-cols-3 auto-rows-auto gap-2">
        {stamps.map(({ id, image }) => (
          <Image key={id} src={image} width={100} height={100} alt="Stamp" className="rounded-lg w-full aspect-square object-cover" />
        ))}
      </div>
    </section>
  );
}
