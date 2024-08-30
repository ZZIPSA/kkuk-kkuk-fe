import { Metadata } from 'next';
import { getRallyData } from './lib';
import { RallyPageProps } from './types';

interface RallyLayoutProps extends RallyPageProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export async function generateMetadata({ params: { id } }: RallyLayoutProps): Promise<Metadata> {
  try {
    const {
      title,
      starter: { name },
    } = await getRallyData(id);
    return {
      title: `${name}님의 ${title} 랠리`,
    };
  } catch (e) {
    return { title: '랠리' };
  }
}

export default function RallyLayout({ children, modal }: RallyLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
