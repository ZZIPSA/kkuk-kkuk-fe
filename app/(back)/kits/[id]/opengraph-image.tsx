import { ImageResponse } from 'next/og';
import OpenGraph from './components/OpenGraph';
import { getKitData, addSrcToStamps, openGraphSizes as sizes } from './lib';
import { notFound } from 'next/navigation';

export const alt = '꾹꾹 키트';
export const size = {
  width: sizes.image * 3 + sizes.gap * 3 + sizes.padding * 2,
  height: sizes.image * 2 + sizes.gap * 2 + sizes.padding * 2,
};

export const contentType = 'image/png';

export default async function Image({ params: { id } }: { params: { id: string } }) {
  const kit = (await getKitData(id)) ?? notFound();
  const srcs = await addSrcToStamps(kit.stamps);

  return new ImageResponse(<OpenGraph srcs={srcs} />, { ...size });
}
