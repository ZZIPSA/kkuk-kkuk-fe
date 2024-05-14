import KitCard from './components/KitCard';
import { Kit } from '@/types/kit';

export default async function KitsPage() {
  const kits: Kit[] = await fetch(process.env.API_URL + "/api/v1/kit")
    .then((res) => res.json());
  return (
    <main className="w-full grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
      {kits.map(({ id, title, description, thumbnailImage, tags, uploader }) => (
        <KitCard id={id} key={id} title={title} description={description} thumbnailImage={thumbnailImage} tags={tags} uploader={uploader} />
      ))}
    </main>
  );
}
