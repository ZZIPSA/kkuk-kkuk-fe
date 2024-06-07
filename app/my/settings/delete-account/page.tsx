import { redirect } from 'next/navigation';

export default function DeleteAccountPage() {
  return redirect('/my/settings');
}
