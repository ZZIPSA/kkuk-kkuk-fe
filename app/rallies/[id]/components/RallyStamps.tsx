import { RallyStamp, StampStatus, StampKind } from '@/components/RallyStamp';
import { RallyPreviewStamp } from '@/types/Stamp';

interface RallyStampsProps {
  stamps: RallyPreviewStamp[];
  total: number;
  stampCount: number;
  owned: boolean;
}

export default function RallyStamps({ stamps, total, stampCount, owned }: RallyStampsProps) {
  return (
    <article className="font-bold">
      <h2 className="pb-6">스탬프 랠리</h2>
      <section className="bg-rally-route bg-contain bg-center bg-no-repeat grid grid-cols-3 auto-rows-auto gap-y-6 gap-x-2">
        {stamps
          .map((e, i) => ({
            ...e,
            order: i,
            status: i < stampCount ? StampStatus.checked : i === stampCount ? StampStatus.checkable : StampStatus.uncheckable,
            kind: i === total - 1 ? StampKind.reward : StampKind.default,
            owned,
          }))
          .map(({ id, image, status, kind, owned, order }) => (
            <RallyStamp key={id} id={id} image={image} status={status} kind={kind} owned={owned} order={order} />
          ))}
      </section>
    </article>
  );
}
