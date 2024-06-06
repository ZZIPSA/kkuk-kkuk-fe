import { DEFAULT_KIT_THUMBNAIL, DEFAULT_PROFILE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { KitCardVariants } from './types';
import { kitCardContainerStyles, kitCardHeaderStyles, kitCardContentStyles, kitCardFooterStyles } from './styles';

export const getKitCardDefaults = ({
  thumbnailImage,
  name,
  image,
}: {
  thumbnailImage?: string | null;
  name?: string | null;
  image?: string | null;
}) => ({
  thumbnail: thumbnailImage ?? DEFAULT_KIT_THUMBNAIL,
  name: name ?? '',
  image: image ?? DEFAULT_PROFILE,
});
export const getConditions = (variant: KitCardVariants) => ({
  vertical: variant === KitCardVariants.vertical,
  StartPage: variant === KitCardVariants.StartPage,
  description: variant === KitCardVariants.description,
});
export const getContainerStyles = (is: ReturnType<typeof getConditions>) => ({
  container: cn(kitCardContainerStyles.default, {
    [kitCardContainerStyles.vertical]: is.vertical,
    [kitCardContainerStyles.StartPage]: is.StartPage,
    [kitCardContainerStyles.description]: is.description,
  }),
});
export const getHeaderStyles = (is: ReturnType<typeof getConditions>) => ({
  header: cn(kitCardHeaderStyles.default, {
    [kitCardHeaderStyles.notStartPage]: !is.StartPage,
    [kitCardHeaderStyles.startPage]: is.StartPage,
  }),
  thumbnail: cn({
    [kitCardHeaderStyles.thumbnail.notStartPage]: !is.StartPage,
    [kitCardHeaderStyles.thumbnail.startPage]: is.StartPage,
  }),
});
export const getContentStyles = (is: ReturnType<typeof getConditions>) => ({
  content: cn(kitCardContentStyles.default, {
    [kitCardContentStyles.startPage]: is.StartPage,
  }),
  title: kitCardContentStyles.title.default,
  tags: kitCardContentStyles.tags.default,
  tag: kitCardContentStyles.tags.tag.default,
  uploader: cn(kitCardContentStyles.uploader.default, {
    [kitCardContentStyles.uploader.vertical]: is.vertical,
  }),
  avatar: kitCardContentStyles.uploader.avatar.default,
  name: kitCardContentStyles.uploader.name.default,
  buttons: kitCardContentStyles.buttons.default,
  button: kitCardContentStyles.buttons.button.default,
  bookmark: kitCardContentStyles.buttons.button.bookmark,
  heart: kitCardContentStyles.buttons.button.heart,
  description: kitCardContentStyles.description.StartPage,
});
export const getFooterStyles = (is: ReturnType<typeof getConditions>) => ({
  footer: kitCardFooterStyles.default,
  description: kitCardFooterStyles.description.default,
});
