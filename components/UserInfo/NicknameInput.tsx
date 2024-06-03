'use client';

import { createRef, useState } from 'react';
import { TextInput } from '@/stories/Input';
import { Button } from '@/stories/Button';

export default function NicknameInput({ name }: { name: string }) {
  const ref = createRef<HTMLInputElement>();
  const [value, setValue] = useState(name);
  const modified = value !== name;
  return (
    <form>
      <TextInput label="닉네임" value={value} ref={ref} onChange={(e) => setValue(e.target.value)} />
      <Button label="수정하기" variant={modified ? 'default' : 'disabled'} className="fixed w-[320px] bottom-4" type="button" />
    </form>
  );
}
