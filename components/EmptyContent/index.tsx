import { ErrorIcon } from '@/lib/icons';

export default function EmptyContent({ message: message }: { message: string }) {
  return (
    <article className={styles.body}>
      <ErrorIcon className={styles.icon} />
      <p>{message}</p>
    </article>
  );
}

const styles = {
  body: 'w-full h-[100vh] bg-grey-50 text-grey-200 text-center text-xs flex flex-col justify-center items-center gap-5',
  icon: 'size-30',
};
