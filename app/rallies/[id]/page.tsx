// import { notFound } from 'next/navigation';
// import { getMember } from '@/auth';
import { dummy } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import { RallyFooter, getButtonVariant } from './components/RallyFooter';

interface RallyPageProps {
  params: { id: string };
}

export default async function RallyPage({ params: { id } }: RallyPageProps) {
  // TODO: 테스트용 상수 제거
  // const { data: rally, error } = await fetch(`/api/rallies/${id}`).then((res) => res.json())
  const { data: rally } = dummy;
  // if (error) return notFound();
  // const user = await getMember(); // TODO: 로직 중 isStampable 계산 시 사용 예정
  const {
    title,
    stampCount,
    createdAt,
    updatedAt,
    kit: { stamps },
    status, // TODO: 활성화 / 비활성화 보다는 진행 / 완료 / 실패로 나누는게 어떤지 검토
    // description, // TODO: 상세 설명을 표시 칸 추가
    // starter, // TODO: 로직 중 isStampable 계산 시 사용 예정
  } = rally;
  const total = stamps.length;
  const percentage = (stampCount / total) * 100;
  // TODO: D-day 계산 방법 << DB 에 종료 예정일(기한) 필드 추가 필요
  // 임시로 7일 뒤 종료로 설정
  let deadline = new Date();
  deadline.setDate(deadline.getDate() + 8);
  const owned = true; // user?.id === starter.id;
  // const isUpdatedToday = false;
  const isStampable = true; // owned && status === 'active' && (isUpdatedToday || stampCount < total);
  const isRewardable = stampCount === total - 1;
  const stampButtonVariant = getButtonVariant(isStampable, isRewardable);
  return (
    <main className="px-4 py-6 bg-grey-50 flex flex-col gap-6">
      <RallyInfo title={title} percentage={percentage} createdAt={createdAt} updatedAt={updatedAt} status={status} deadline={deadline} />
      <RallyStamps stamps={stamps} total={total} stampCount={stampCount} owned={owned} />
      <RallyFooter owned={owned} variant={stampButtonVariant} />
    </main>
  );
}
