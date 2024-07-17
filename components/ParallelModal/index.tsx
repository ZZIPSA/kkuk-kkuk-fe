import Link from 'next/link';
import styles from './styles';
import { defaults } from './lib';
import { cn } from '@/lib/utils';

interface ParallelModalProps {
  back: string;
  labels: { submit?: string; cancel?: string };
  onSubmit: (form: FormData) => Promise<void>;
  className?: string;
  children?: React.ReactNode;
}

export default function Modal({
  back = defaults.back,
  labels = defaults.labels,
  onSubmit = defaults.onSubmit,
  className,
  children,
}: ParallelModalProps) {
  return (
    <>
      <Backdrop back={back} />
      <form className={cn(styles.container, className)} action={onSubmit}>
        {children}
        <Buttons back={back} {...labels} />
      </form>
    </>
  );
}

function Backdrop({ back }: { back: string }) {
  return <Link href={back} className={styles.backdrop} />;
}
export function ModalTitle({ children }: { children?: React.ReactNode }) {
  return <h1 className={styles.title}>{children}</h1>;
}

export function ModalDescription({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <p className={cn(styles.description, className)}>{children}</p>;
}

function Buttons({ back, submit, cancel }: { back: string; submit?: string; cancel?: string }) {
  return (
    <section className={styles.buttons}>
      {cancel && (
        <Link href={back} className={styles.cancel}>
          {cancel}
        </Link>
      )}
      {submit && (
        <button type="submit" className={styles.submit}>
          {submit}
        </button>
      )}
    </section>
  );
}
