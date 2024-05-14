import KitCard from "./components/KitCard";
import { Kit } from "./types";

export default async function KitsPage() {
  const kits: Kit[] = await fetch(process.env.API_URL + "/api/v1/kit")
    .then((res) => res.json());
  return (
    <main className="w-full grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
      {kits.map(
        ({ id, title, description, thumbnail_image, tags, uploader_id }) => (
          <KitCard
            kitId={id}
            key={id}
            title={title}
            description={description}
            thumbnail_image={thumbnail_image}
            tags={tags}
            uploader_id={uploader_id}
          />
        )
      )}
    </main>
  );
}
