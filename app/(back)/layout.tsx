import BackHeader from '@/components/BackHeader';

export default function BackLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BackHeader />
      {children}
    </>
  );
}
