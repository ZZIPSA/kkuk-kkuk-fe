import { Metadata } from 'next';
import NewKitForm from './components/NewKitForm';

export const metadata: Metadata = {
  title: '새로운 키트 만들기',
};

export default async function NewKitPage() {
  return (
    <main className="w-full mx-auto px-4 py-6">
      <NewKitForm />
    </main>
  );
}
