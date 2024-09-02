import { useMember } from '@/hooks/use-user';
import { OutlineTrash } from '@/lib/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { extractId, useKitUploaderId, useRallyStarterId } from './lib';

export default function SettingMenu() {
  const path = usePathname();
  const id = extractId(path);
  if (!id) return null;
  if (/\/rallies\/\w+/.test(path)) return <DeleteRallyButton id={id} />;
  if (/kits\/\w+/.test(path)) return <DeleteKitButton id={id} />;
  return null;
}

function DeleteRallyButton({ id }: { id: string }) {
  const viewerId = useMember()?.id;
  const starterId = useRallyStarterId(id);
  if (starterId !== viewerId) return null;
  return (
    <Link href={`/rallies/${id}/delete`}>
      <OutlineTrash className="w-6 h-6 fill-red-500 " />
    </Link>
  );
}

function DeleteKitButton({ id }: { id: string }) {
  const viewerId = useMember()?.id;
  const starterId = useKitUploaderId(id);
  if (starterId !== viewerId) return null;
  return (
    <Link href={`/kits/${id}/delete`}>
      <OutlineTrash className="w-6 h-6 fill-red-500 " />
    </Link>
  );
}
