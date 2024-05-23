import UserInfo from '@/components/UserInfo';
import { UserInfoVariant } from '@/components/UserInfo/variants';

export default async function SettingsPage() {
  return (
    <main>
      <UserInfo variant={UserInfoVariant.settings} />
    </main>
  );
}
