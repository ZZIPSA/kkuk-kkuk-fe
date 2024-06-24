import { DOMAIN } from '@/lib/constants';
import { addPx } from '@/lib/utils';
import { openGraphSizes as sizes } from '../../lib';

interface StampWithSrc {
  id: string;
  src: string;
}

interface OpenGraphProps {
  srcs: StampWithSrc[];
}

const OpenGraph = ({ srcs }: OpenGraphProps) => (
  <Frame>
    <FirstRow srcs={srcs.slice(0, 3)} />
    <SecondRow srcs={srcs.slice(3, 6).reverse()} />
  </Frame>
);

export default OpenGraph;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: addPx(sizes.padding),
      display: 'flex',
      flexDirection: 'column',
      gap: addPx(sizes.gap),
      backgroundColor: 'white',
    }}
  >
    {children}
  </div>
);

const FirstRow = ({ srcs }: { srcs: StampWithSrc[] }) => (
  <Row>
    {srcs.map(({ id, src }) => (
      <Stamp src={src} key={id} />
    ))}
  </Row>
);

const SecondRow = ({ srcs }: { srcs: StampWithSrc[] }) => (
  <Row>
    {srcs.map(({ id, src }, index) =>
      index === 0 ? (
        <span key={id}>
          <Stamp src={src} />
          <Gift />
        </span>
      ) : (
        <Stamp src={src} key={id} />
      ),
    )}
  </Row>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: addPx(sizes.gap),
    }}
  >
    {children}
  </div>
);

const Stamp = ({ src }: { src: string }) => (
  <img
    src={src}
    width={sizes.image}
    height={sizes.image}
    style={{
      borderRadius: '1rem',
    }}
  />
);

const Gift = () => (
  <img
    src={`${DOMAIN}/gift.png`}
    width={sizes.image}
    height={sizes.image}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '1rem',
    }}
  />
);
