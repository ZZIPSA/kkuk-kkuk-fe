import UserInfo, { UserInfoVariant } from '@/components/UserInfo';

export default async function SettingsPage() {
  return (
    <main>
      <UserInfo variant={UserInfoVariant.settings} />
    </main>
  );
}
