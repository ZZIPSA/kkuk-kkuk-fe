import Modal, { ModalDescription, ModalTitle } from '@/components/ParallelModal';
import { SadCat } from '@/lib/icons';
import { extendRally } from '../../actions';

export default async function ExtendModal({ id, kitId }: { id: string; kitId: string }) {
  return (
    <Modal back={`/kit/${kitId}`} labels={{ submit: '기간 연장하기', cancel: '새로 시작하기' }} onSubmit={extendRally}>
      <SadCat className="size-18 m-auto" />
      <input type="hidden" name="id" value={id} />
      <ModalTitle>아이쿠 아쉬워요!</ModalTitle>
      <ModalDescription>
        기간안에 스탬프 랠리를 마무리 하지 못했어요!
        <br />
        1회 한정 남은 기간을 연장하여
        <br />
        랠리를 이어갈 수 있어요!
      </ModalDescription>
    </Modal>
  );
}