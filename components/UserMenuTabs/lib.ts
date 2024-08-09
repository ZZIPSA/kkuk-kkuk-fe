import { MenuItem } from './types';

export const getItems = (id: string): MenuItem[] => [
  {
    label: '진행중인 랠리',
    href: id === 'my' ? '/my/joins' : `/users/${id}/joins`,
  },
  {
    label: '완료한 랠리',
    href: id === 'my' ? '/my/completes' : `/users/${id}/completes`,
  },
  {
    label: '업로드한 키트',
    href: id === 'my' ? '/my/uploads' : `/users/${id}/uploads`,
  },
];
