import UserInfo from '@/components/UserInfo';
import { UserInfoVariant } from '@/components/UserInfo/variants';
import { UserSettings } from './components/UserSettings';
import TeamInfo from './components/TeamInfo';

export default async function SettingsPage() {
  return (
    <main className={styles.main}>
      <UserInfo variant={UserInfoVariant.settings} />
      <UserSettings />
      <TeamInfo />
    </main>
  );
}

const styles = {
  main: 'w-full h-[calc(100vh-3rem)] flex flex-col gap-6 bg-grey-50',
};
