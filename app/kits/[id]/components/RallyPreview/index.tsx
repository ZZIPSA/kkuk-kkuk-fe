import { RallyPreviewStamp } from '@/types/Stamp';
import { RallyStamp, StampStatus, StampKind } from '@/components/RallyStamp';

type RallyPreviewProps = { stamps: RallyPreviewStamp[] };

export default function RallyPreview({ stamps }: RallyPreviewProps) {
  return (
    <section className="bg-grey-50 border-t border-grey-200 px-4 py-6 flex flex-col gap-6">
      <h2 className="font-bold">스탬프 랠리 미리보기</h2>
      <div className="bg-white p-6 rounded-2xl">
        <div className="bg-rally-route bg-contain bg-center bg-no-repeat grid grid-cols-3 auto-rows-auto gap-y-6 gap-x-2">
          {stamps
            .map((e, i) => ({
              ...e,
              order: i,
              status: i === 0 ? StampStatus.checked : i === 1 ? StampStatus.checkable : StampStatus.uncheckable,
              kind: i === 6 ? StampKind.reward : StampKind.default,
              owned: false,
            }))
            .map(({ id, objectKey, status, kind, owned, order }) => (
              <RallyStamp key={id} id={id} objectKey={objectKey} status={status} kind={kind} owned={owned} order={order} />
            ))}
        </div>
      </div>
    </section>
  );
}
