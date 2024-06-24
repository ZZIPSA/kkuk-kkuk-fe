import { Metadata } from 'next';
import { KitPageInfo } from './types';
import { getKitData } from './lib';

export async function generateMetadata({ params: { id } }: KitPageInfo): Promise<Metadata> {
  const {
    data: {
      title,
      uploader: { name },
    },
  } = await getKitData(id);
  return {
    title: {
      absolute: `꾹꾹 | ${name}님의 ${title} 키트`,
      template: `꾹꾹 | ${name}님의 ${title} 키트%s`,
    },
  };
}
export default async function KitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
