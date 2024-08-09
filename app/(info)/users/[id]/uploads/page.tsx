import { Metadata } from 'next';
import { fetchUserKits } from '@/lib/users';
import EmptyContent from '@/components/EmptyContent';
import UploadKits from '@/components/UploadKits/page';
import { redirectIfMine } from '../lib';

export const metadata: Metadata = {
  title: '업로드한 키트',
};

export default async function UploadsPage({ params: { id: userId } }: { params: { id: string } }) {
  redirectIfMine('/my/uploads')(userId);
  const kits = await fetchUserKits(userId);
  if (kits.length === 0) return <EmptyContent message="업로드한 키트가 없어요!" />;

  return <UploadKits kits={kits} />;
}
