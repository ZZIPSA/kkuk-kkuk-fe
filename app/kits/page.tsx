import { KitCard } from "./components";
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

const dummyKits: Kit[] = [
  {
    id: 1,
    title: "뫄뫄장르 솨솨캐릭 세트",
    description: "뫄뫄장르의 솨솨캐릭 세트입니다.",
    uploader_id: 1,
    board_image: "https://스탬프-판-링크",
    stamp_images: [
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    ],
    total_blank: 5,
    thumbnail_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
    reward_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    tags: ["뫄뫄장르"],
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updated_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  {
    id: 2,
    title: "내용이 긴 세트",
    description: `뻔해 높은 하이힐 유리 구두 Funny 불편한 건 No Time To Change Your Shoes  Step It Up Like Air Force One Next Version Up Up Up 이젠 맘을 열어 Face New Universe  뛰어봐 Let’s Run Run Run 심장이 또 점점 더 Let It Fly To The Sky 우리  맞춰가 우리만의 페이스 두발엔 All White 들뜬 마음까지 다  Ready Set And Go Dara Dara Dadada Dada Dada Step By Step Boy Dara Dara Dadada Dada Dada Tell Me Your Voice  끝없이 펼쳐진 라인 이 순간 다 Let Go Dara Dara Dadada Dada Dada`,
    uploader_id: 89876543,
    board_image: "https://스탬프-판-링크",
    stamp_images: [
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
    ],
    total_blank: 5,
    thumbnail_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
    reward_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updated_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  {
    id: 3,
    title: "태그가 많은 세트",
    description: "꾹꾹에서 제공하는 기본 스탬프 세트입니다.",
    uploader_id: 2,
    board_image: "https://스탬프-판-링크",
    stamp_images: [
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
    ],
    total_blank: 5,
    thumbnail_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
    reward_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    tags: [
      "뫄뫄장르",
      "김솨솨",
      "이와와",
      "정발산",
      "산기슭",
      "슭곰발",
      "발냄새",
      "새타령",
      "영부인",
      "인사잘해",
    ],
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updated_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  {
    id: 4,
    title:
      "제목이길어슬픈것까진아니고길어서짤려야만하는겁나겁나겁나긴제목의스탬프세트",
    description: "겁.나.깁.니.다.",
    uploader_id: 2,
    board_image: "https://스탬프-판-링크",
    stamp_images: [
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
    ],
    total_blank: 5,
    thumbnail_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
    reward_image:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updated_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
];
