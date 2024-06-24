export const styles = {
  container:
    'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[328px] shadow-lg bg-background text-center p-6 flex flex-col gap-6 rounded-xl z-50',
  icon: 'size-18 m-auto',
  backdrop: 'fixed top-0 bottom-0 left-0 right-0 bg-grey-400/20 backdrop-blur-sm z-50 ease-in',
  text: 'text-grey-400 text-sm',
  title: 'text-xl font-bold',
  buttons: `flex gap-2 justify-stretch`,
  cancel: 'py-4 rounded-xl w-full border text-grey-400',
  delete: 'py-4 rounded-xl w-full bg-primary text-white',
};
const keys = ['cancel', 'delete'] as const;
export const hrefs = {
  cancel: '/my/settings',
  delete: '/api/delete-account', // 임시 주소
  backdrop: '/my/settings',
} as const;
const labels = {
  cancel: '취소하기',
  delete: '탈퇴하기',
} as const;
export const buttons = keys.map((key) => ({ key, className: styles[key], label: labels[key], href: hrefs[key] }) as const);
