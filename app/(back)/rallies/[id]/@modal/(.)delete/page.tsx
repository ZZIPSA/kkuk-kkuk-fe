import Modal, { ModalDescription, ModalTitle } from '@/components/ParallelModal';
import { SadCat } from '@/lib/icons';
import { RallyPageProps } from '../../types';
import { deleteRally } from './actions';

export default function DeleteRallyModal({ params: { id } }: RallyPageProps) {
  return (
    <Modal back={`/rallies/${id}`} labels={{ submit: '포기하기', cancel: '뒤로가기' }} onSubmit={deleteRally}>
      <SadCat className="size-18 m-auto" />
      <ModalTitle title="정말 랠리를 포기하시겠어요?" />
      <ModalDescription text="랠리를 포기하면 삭제되어 다신 이어갈 수 없어요!" />
    </Modal>
  );
}
