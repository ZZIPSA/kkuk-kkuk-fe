import { Check } from '@/lib/icons';

export default function ShowCompletedOnly() {
  return (
    <label className={styles.label}>
      <input type="checkbox" className={styles.input} defaultChecked={true} />
      <Check className={styles.checkbox} />
      완주한 랠리만 보기
    </label>
  );
}

const styles = {
  label: 'col-span-full -mb-1 text-sm text-grey-300 cursor-pointer',
  input: 'hidden peer',
  checkbox: 'inline-block size-6 rounded p-0.5 mr-2 stroke-2 stroke-background fill-none bg-grey-100 peer-checked:bg-primary',
};
