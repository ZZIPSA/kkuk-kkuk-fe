import { Metadata } from 'next';
import { ensureMember } from '@/auth';
import { fetchUserKits } from '@/lib/users';
import UploadKits from '@/components/UploadKits/page';

export const metadata: Metadata = {
  title: '업로드한 키트',
};

export default async function UploadsPage() {
  const { id: userId } = await ensureMember();
  const kits = await fetchUserKits(userId);

  return <UploadKits kits={kits} />;
}
