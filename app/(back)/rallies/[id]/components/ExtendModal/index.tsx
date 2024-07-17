import Modal, { ModalDescription, ModalTitle } from '@/components/ParallelModal';
import { SadCat } from '@/lib/icons';
import { extendRally } from '../../actions';
import { pipe } from '@fxts/core';
import { bind, remain } from '@/lib/do';

interface ExtendModalProps {
  id: string;
  kitId: string;
  extendable: boolean;
  startable: boolean;
}

export default async function ExtendModal({ id, kitId, extendable, startable }: ExtendModalProps) {
  const labels = getLabels({ extendable, startable });
  return (
    <Modal back="/rallies" cancel={startable ? `/kits/${kitId}` : '/rallies'} labels={labels} onSubmit={extendRally} className="px-2">
      <SadCat className="size-18 m-auto" />
      <input type="hidden" name="id" value={id} />
      <ModalTitle>아이쿠 아쉬워요!</ModalTitle>
      {extendable ? <ExtendableDescription /> : <NotExtendableDescription />}
    </Modal>
  );
}

const getLabels = (e: { extendable: boolean; startable: boolean }) =>
  pipe(
    e,
    bind('submit', ({ extendable, startable }) => (extendable ? '기간 연장하기' : startable ? '같은 랠리로 새로 시작하기' : undefined)),
    bind('cancel', ({ extendable, startable }) => (extendable && startable ? '새로 시작하기' : undefined)),
    remain(['submit', 'cancel'] as const),
  );

function ExtendableDescription() {
  return (
    <ModalDescription>
      기간안에 스탬프 랠리를 마무리 하지 못했어요!
      <br />
      1회 한정 남은 기간을 연장하여
      <br />
      랠리를 이어갈 수 있어요!
    </ModalDescription>
  );
}
function NotExtendableDescription() {
  return (
    <ModalDescription>
      기간안에 스탬프 랠리를 마무리 하지 못했어요!
      <br />
      아쉽지만 이미 연장한 랠리는 또다시 연장할 수 없어요.
      <br />
      다시 한 번 도전해보는 건 어떨까요?
    </ModalDescription>
  );
}
