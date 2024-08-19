import Modal, { ModalDescription, ModalTitle } from '@/components/ParallelModal';
import { SadCat } from '@/lib/icons';
import { RallyPageProps } from '../../types';
import { deleteRally } from './actions';
import { getTexts } from './lib';

export default async function DeleteRallyModal({ params: { id } }: RallyPageProps) {
  const { title, description } = await getTexts(id);
  return (
    <Modal back={`/rallies/${id}`} labels={{ submit: '포기하기', cancel: '뒤로가기' }} onSubmit={deleteRally}>
      <input type="hidden" name="id" value={id} />
      <SadCat className="size-18 m-auto" />
      <ModalTitle>{title}</ModalTitle>
      <ModalDescription>{description}</ModalDescription>
    </Modal>
  );
}
