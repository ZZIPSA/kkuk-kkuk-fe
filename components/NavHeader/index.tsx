import { SessionProvider } from 'next-auth/react';
import NavBar from '@/components/NavBar';

export default function NavHeader() {
  return (
    <header className="border-b px-4 py-2 w-full top-0 sticky bg-background z-40">
      <SessionProvider>
        <NavBar />
      </SessionProvider>
    </header>
  );
}
