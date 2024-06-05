import { DEFAULT_KIT_THUMBNAIL, DEFAULT_PROFILE } from '@/lib/constants';
import { KitCardVariants } from './types';

export const getDefault = ({ thumbnailImage, name, image }: { thumbnailImage?: string | null; name?: string | null; image?: string | null }) => ({
  thumbnail: thumbnailImage ?? DEFAULT_KIT_THUMBNAIL,
  name: name ?? '',
  image: image ?? DEFAULT_PROFILE,
});
export const getConditions = (variant: KitCardVariants) => ({
  vertical: variant === KitCardVariants.vertical,
  StartPage: variant === KitCardVariants.StartPage,
  description: variant === KitCardVariants.description,
});
