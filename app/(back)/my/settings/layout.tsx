import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 정보 수정하기',
};

export default function MySettingsLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
