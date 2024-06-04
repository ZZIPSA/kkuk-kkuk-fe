// import { notFound } from 'next/navigation';
// import { getMember } from '@/auth';
import { dummy, getTempValue } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import { RallyFooter } from './components/RallyFooter';

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
    // stampCount, TODO: 로직 완료 후 주석 해제
    createdAt,
    updatedAt,
    kit: { stamps },
    // status, // TODO: 로직 완료 후 주석 해제 // TODO: 활성화 / 비활성화 보다는 진행 / 완료 / 실패로 나누는게 어떤지 검토 -> 기한 추가 시 재검토
    // description, // TODO: 상세 설명을 표시 칸 추가
    // starter, // TODO: 로직 중 isStampable 계산 시 사용 예정
  } = rally;
  // TODO: 레이아웃 테스트용 임시 변수로 ID 첫자리를 전날까지 찍은 스탬프 개수, 둘째자리를 오늘 스탬프 여부, 셋째자리를 소유 여부로 사용
  const { stampCount, owned, isStampedToday } = getTempValue(id);
  const total = stamps.length;
  const count = stampCount + Number(isStampedToday); // 오늘까지 찍은 스탬프 개수
  const status = count === total ? 'inactive' : 'active'; // TODO: 레이아웃 테스트용 임시 변수로 도장을 모두 채웠다면 'active', 아니면 'inactive'
  const percentage = (count / total) * 100;

  return (
    <main className="px-4 py-6 w-full bg-grey-50 flex flex-col gap-6">
      <RallyInfo title={title} percentage={percentage} createdAt={createdAt} updatedAt={updatedAt} status={status} /* deadline={deadline} */ />
      <RallyStamps stamps={stamps} total={total} stampCount={stampCount} owned={owned} isStampedToday={isStampedToday} />
      <RallyFooter owned={owned} status={status} stampCount={stampCount} total={total} isStampedToday={isStampedToday} />
    </main>
  );
}
