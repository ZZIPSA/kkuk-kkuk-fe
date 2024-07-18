import { pipe } from '@fxts/core';
import { bind, remain } from '@/lib/do';

interface Flags {
  extendable: boolean;
  startable: boolean;
}

export const getExtendModalInfo = (e: Flags & { kitId: string }) =>
  pipe(
    e,
    bind('cancel', getCancelLink),
    bind('labels', getLabels),
    bind('description', getDescription),
    remain(['cancel', 'labels', 'description'] as const),
  );
const getCancelLink = (e: Flags & { kitId: string }) => (e.extendable && e.startable ? `/kits/${e.kitId}` : '/rallies');
const getDescription = ({ extendable, startable }: Flags) =>
  extendable ? descriptions.extendable : startable ? descriptions.notExtendable : descriptions.notStartable;
const getLabels = (e: Flags) => pipe(e, bind('submit', getSubmit), bind('cancel', getCancel), remain(['submit', 'cancel'] as const));
const getSubmit = ({ extendable, startable }: Flags) => (extendable ? submits.extendable : startable ? submits.notExtendable : submits.notStartable);
const getCancel = ({ extendable, startable }: Flags) => (extendable && startable ? cancels.extendable : undefined);

const submits = {
  extendable: '기간 연장하기',
  notExtendable: '같은 키트로 새로 시작하기',
  notStartable: '다른 키트로 시작하기',
} as const;
const cancels = {
  extendable: '새로 시작하기',
} as const;
const descriptions = {
  extendable: '기간안에 스탬프 랠리를 마무리 하지 못했어요!\n1회 한정 남은 기간을 연장하여\n랠리를 이어갈 수 있어요!',
  notExtendable:
    '기간안에 스탬프 랠리를 마무리 하지 못했어요!\n아쉽지만 이미 연장한 랠리는 또다시 연장할 수 없어요.\n다시 한 번 도전해보는 건 어떨까요?',
  notStartable: '키트가 삭제되어 랠리를 다시 시작할 수 없어요!\n다른 키트를 찾아볼까요?',
} as const;
