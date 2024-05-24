import { notFound } from 'next/navigation';

export default async function KitStartPage({ params: { id } }: { params: { id: string } }) {
  const { data: kit } = await fetch(`${process.env.API_URL}/api/kits/${id}`).then((res) => res.json());
  if (!kit) return notFound();
  const { title, description, tags, thumbnailImage, uploader } = kit;

  return (
    <main className="py-6 px-4 flex flex-col gap-6">
    </main>
  );
}
