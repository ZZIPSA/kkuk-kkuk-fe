import type { FormState } from 'react-hook-form';
import { default as Button } from '@/components/Submit';
import { PencilPlus } from '@/lib/icons';
import type { FormValues } from './types';

export default function Submit({ state }: { state: FormState<FormValues> }) {
  return (
    <Button className={styles.button} state={state}>
      <PencilPlus className={styles.pencilPlus} />
      랠리 시작하기
    </Button>
  );
}
const styles = {
  button: 'bg-primary w-full',
  pencilPlus: 'fill-white',
};
