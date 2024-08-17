import { Metadata } from 'next';
import { fetchUserKits } from '@/lib/users';
import UploadKits from '@/components/UploadKits/page';
import { redirectIfMine } from '../lib';

export const metadata: Metadata = {
  title: '업로드한 키트',
};

export default async function UploadsPage({ params: { id: userId } }: { params: { id: string } }) {
  await redirectIfMine('/my/uploads')(userId);
  const kits = await fetchUserKits(userId);

  return <UploadKits kits={kits} />;
}
