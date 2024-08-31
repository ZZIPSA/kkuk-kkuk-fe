import { Metadata } from 'next';
import { KitPageInfo } from './types';
import { getKitData } from './lib';

export async function generateMetadata({ params: { id } }: KitPageInfo): Promise<Metadata> {
  const kit = await getKitData(id);
  return { title: kit ? `${kit.uploader.name}님의 ${kit.title} 키트` : `찾을 수 없는 키트` };
}
export default async function KitLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
