import { Metadata } from 'next';
import { getRallyData } from './lib';
import { RallyPageProps } from './types';

export async function generateMetadata({ params: { id } }: RallyPageProps): Promise<Metadata> {
  const {
    title,
    starter: { name },
  } = await getRallyData(id);
  return {
    title: `${name}님의 ${title} 랠리`,
  };
}

export default function RallyLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
