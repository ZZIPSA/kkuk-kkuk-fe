import { cn } from '@/lib/utils';

export function UserSettings() {
  return (
    <section className={styles.default}>
      <button className={styles.button}>로그아웃</button>
      <button className={cn(styles.button, styles.deleteButton)}>회원탈퇴</button>
    </section>
  );
}

const styles = {
  default: 'flex flex-col w-full bg-grey-50 divide-y',
  button: 'p-4 bg-background w-full text-left',
  deleteButton: 'text-red-500',
};
