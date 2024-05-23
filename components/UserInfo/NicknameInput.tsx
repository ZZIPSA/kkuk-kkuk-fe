'use client';

import { createRef, useState } from 'react';
import { Input } from '@/stories/Input';
import { Button } from '@/stories/Button';

export default function NicknameInput({ nickname }: { nickname: string }) {
  const ref = createRef<HTMLInputElement>();
  const [value, setValue] = useState(nickname);
  const modified = value !== nickname;
  return (
    <form>
      <Input label="닉네임" value={value} ref={ref} onChange={(e) => setValue(e.target.value)} />
      <Button label="수정하기" variant={modified ? 'default' : 'disabled'} className="mr-4 fixed bottom-4 left-4 right-0" type="button" />
    </form>
  );
}
