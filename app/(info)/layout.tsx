import NavHeader from '@/components/NavHeader';
export default function InfoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavHeader />
      {children}
    </>
  );
}
