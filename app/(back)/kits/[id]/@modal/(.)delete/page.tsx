import Modal, { ModalDescription, ModalTitle } from '@/components/ParallelModal';
import { SadCat } from '@/lib/icons';
import { KitPageInfo } from '../../types';
import { deleteKit } from './actions';

export default async function DeleteRallyModal({ params: { id } }: KitPageInfo) {
  return (
    <Modal back={`/kits/${id}`} labels={{ submit: '삭제하기', cancel: '뒤로가기' }} onSubmit={deleteKit}>
      <input type="hidden" name="id" value={id} />
      <SadCat className="size-18 m-auto" />
      <ModalTitle>정말 키트를 삭제하시겠어요?</ModalTitle>
      <ModalDescription>키트 삭제 시 해당 키트로 랠리가 진행 불가능하며 복구가 불가능해요!</ModalDescription>
    </Modal>
  );
}
