export default function Modal({ children, open }: { children: React.ReactNode; open: boolean }) {
  if (!open) return null;
  return (
    <dialog className={styles.dialog}>
      <section className={styles.section}>{children}</section>
    </dialog>
  );
}

const styles = {
  dialog: 'fixed top-0 left-0 w-full h-full bg-foreground/20 text-foreground backdrop-blur-sm z-50 ease-in flex justify-center items-center',
  section: 'w-[328px] bg-background rounded-xl p-6 flex flex-col gap-6 items-center justify-stretch text-center text-sm text-foreground/60',
};
