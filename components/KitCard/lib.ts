import { DEFAULT_KIT_THUMBNAIL, DEFAULT_PROFILE } from '@/lib/constants';

export const getDefault = ({ thumbnailImage, name, image }: { thumbnailImage?: string | null; name?: string | null; image?: string | null }) => ({
  thumbnail: thumbnailImage ?? DEFAULT_KIT_THUMBNAIL,
  name: name ?? '',
  image: image ?? DEFAULT_PROFILE,
});
