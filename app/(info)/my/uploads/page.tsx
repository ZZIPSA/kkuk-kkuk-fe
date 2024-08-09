import { Metadata } from 'next';
import { ensureMember } from '@/auth';
import { fetchUserKits } from '@/lib/users';
import EmptyContent from '@/components/EmptyContent';
import UploadKits from '@/components/UploadKits/page';

export const metadata: Metadata = {
  title: '업로드한 키트',
};

export default async function UploadsPage() {
  const { id: userId } = await ensureMember();
  const kits = await fetchUserKits(userId);
  if (kits.length === 0) return <EmptyContent message="업로드한 키트가 없어요!" />;

  return <UploadKits kits={kits} />;
}
