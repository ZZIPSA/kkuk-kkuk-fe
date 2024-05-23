import UserInfo from '@/components/UserInfo';
import { UserInfoVariant } from '@/components/UserInfo/variants';
import { UserSettings } from './components/UserSettings';

export default async function SettingsPage() {
  return (
    <main>
      <UserInfo variant={UserInfoVariant.settings} />
      <UserSettings />
    </main>
  );
}
