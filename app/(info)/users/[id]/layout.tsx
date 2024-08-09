import UserInfo from '@/components/UserInfo';
import MenuTabs from '@/components/UserMenuTabs';

export default async function UsersLayout({ children, params: { id } }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <main className="w-full">
      <UserInfo id={id} />
      <MenuTabs id={id} />
      {children}
    </main>
  );
}
