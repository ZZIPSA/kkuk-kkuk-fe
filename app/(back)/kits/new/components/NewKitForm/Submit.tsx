import type { FormState } from 'react-hook-form';
import Button from '@/components/Submit';
import { PencilPlus } from '@/lib/icons';
import type { FormValues } from './types';

export default function Submit({ state }: { state: FormState<FormValues> }) {
  return (
    <Button state={state}>
      <PencilPlus className={styles.pencilPlus} />
      키트 만들기
    </Button>
  );
}
const styles = {
  pencilPlus: 'fill-white',
};
