import { AUTO_TWEET, AUTO_TWEET_HASHTAGS } from '@/lib/constants';
import { addDomain } from '@/lib/utils';

export const getTwitterShareLink = (path: string) =>
  `https://twitter.com/intent/tweet?text=${AUTO_TWEET}&hashtags=${AUTO_TWEET_HASHTAGS}&url=${encodeURI(addDomain(path))}`;
export const copyToClipboard = (path: string) => () => navigator.clipboard.writeText(addDomain(path));
