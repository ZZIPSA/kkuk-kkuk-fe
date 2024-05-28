'use client';

import { createRef, useState } from 'react';
import { Input } from '@/stories/Input';
import { Button } from '@/stories/Button';

export default function NicknameInput({ name }: { name: string }) {
  const ref = createRef<HTMLInputElement>();
  const [value, setValue] = useState(name);
  const modified = value !== name;
  return (
    <form>
      <Input label="닉네임" value={value} ref={ref} onChange={(e) => setValue(e.target.value)} />
      <Button label="수정하기" variant={modified ? 'default' : 'disabled'} className="mr-4 fixed bottom-4 left-4 right-0" type="button" />
    </form>
  );
}
