import Modal, { ModalDescription, ModalTitle } from '@/components/ParallelModal';
import { SadCat } from '@/lib/icons';
import { extendRally } from '../../actions';
import { getExtendModalInfo } from './lib';

interface ExtendModalProps {
  owned: boolean;
  failed: boolean;
  id: string;
  kitId: string;
  extendable: boolean;
  startable: boolean;
}

export default async function ExtendModal({ owned, failed, id, kitId, extendable, startable }: ExtendModalProps) {
  if (!owned || !failed) return null;
  const { description, labels, cancel } = getExtendModalInfo({ kitId, extendable, startable });
  return (
    <Modal back="/rallies" cancel={cancel} labels={labels} onSubmit={extendRally} className="px-4">
      <SadCat className="size-18 m-auto" />
      <input type="hidden" name="id" value={id} />
      <ModalTitle>아이쿠 아쉬워요!</ModalTitle>
      <ModalDescription className="whitespace-pre">{description}</ModalDescription>
    </Modal>
  );
}
