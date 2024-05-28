import Image from 'next/image';
import { RallyPreviewStamp } from '@/types/Stamp';

type StampPreviewProps = { stamps: RallyPreviewStamp[] };

export default function StampsPreview({ stamps }: StampPreviewProps) {
  return (
    <section className="bg-grey-50 px-4 pb-6 flex flex-col gap-4">
      <h2 className="font-bold">스탬프 목록</h2>
      <div className="grid grid-cols-3 auto-rows-auto gap-2">
        {stamps.map(({ id, image }) => (
          <div key={id} className="w-full aspect-square relative">
            <Image src={image} fill alt="Stamp" className="rounded-lg aspect-square object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
