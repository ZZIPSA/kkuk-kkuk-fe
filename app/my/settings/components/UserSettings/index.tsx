import { cn } from '@/lib/utils';

export function UserSettings() {
  return (
    <section className={styles.default}>
      {items.map((item, index) => (
        <button key={index} className={cn(styles.button, item.styles)}>
          {item.label}
        </button>
      ))}
    </section>
  );
}

const items = [
  {
    label: '로그아웃',
  },
  {
    label: '회원탈퇴',
    styles: 'text-red-500',
  },
];
const styles = {
  default: 'pt-6 pb-[50vh] flex flex-col w-full h-full bg-grey-50 divide-y',
  button: 'p-4 bg-background w-full text-left',
};
