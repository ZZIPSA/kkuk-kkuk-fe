import NavHeader from '@/components/NavHeader';
import BackHeader from '@/components/BackHeader';

export default function BackLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavHeader />
      <BackHeader />
      {children}
    </>
  );
}
