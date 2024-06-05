import UserInfo from '@/components/UserInfo';
import { UserInfoVariant } from '@/components/UserInfo/variants';
import { UserSettings } from './components/UserSettings';

export default async function SettingsPage() {
  return (
    <main className="w-full">
      <UserInfo variant={UserInfoVariant.settings} />
      <UserSettings />
    </main>
  );
}
