import Link from 'next/link';
import styles from './styles';
import { defaults } from './lib';

interface ParallelModalProps {
  back: string;
  labels: { submit?: string; cancel?: string };
  onSubmit: (form: FormData) => Promise<void>;
  children?: React.ReactNode;
}

export default function Modal({ back = defaults.back, labels = defaults.labels, onSubmit = defaults.onSubmit, children }: ParallelModalProps) {
  return (
    <>
      <Backdrop back={back} />
      <form className={styles.container} action={onSubmit}>
        {children}
        <Buttons back={back} {...labels} />
      </form>
    </>
  );
}

function Backdrop({ back }: { back: string }) {
  return <Link href={back} className={styles.backdrop} />;
}
export function ModalTitle({ title }: { title: string }) {
  return <h1 className={styles.title}>{title}</h1>;
}

export function ModalDescription({ description }: { description: string }) {
  return <p className={styles.description}>{description}</p>;
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
