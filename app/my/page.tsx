import { redirect } from 'next/navigation';

export default async function MyPage() {
  return redirect('/my/joins');
}
