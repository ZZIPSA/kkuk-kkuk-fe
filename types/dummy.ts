import { Rally, RallyStatus } from "./rally";

export const dummyRally: Rally = {
  id: "cuid",
  title: "1일 30분 러닝", // 유저가 설정한 목표
  description: "매일 아침 일어나자마자 30분 러닝하고 오기", // 유저가 설정한 세부 목표
  status: RallyStatus.ACTIVE, // active | inactive
  starter: {
    id: "cuid",
    nickname: "닉네임",
    profileImage: "프로필 이미지 링크",
  },
  kit: {
    // 스탬프 키트의 정보
    id: "cuid",
    title: "뫄뫄장르 솨솨캐릭 세트",
    description: "뫄뫄장르의 솨솨캐릭 세트입니다.",
    uploader: {
      id: "cuid",
      nickname: "닉네임",
      profileImage: "프로필이미지 링크",
    },
    boardImage: "스탬프 판 링크",
    stampImages: [
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    ],
    totalBlank: 5,
    thumbnailImage:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
    rewardImage:
      "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
    tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
    createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  stamped: 1, // 찍은 스탬프 갯수
  createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
  updatedAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
};

export const dummyRallies: Rally[] = [
  {
    id: "cuid",
    title: "1일 30분 러닝", // 유저가 설정한 목표
    description: "매일 아침 일어나자마자 30분 러닝하고 오기", // 유저가 설정한 세부 목표
    status: RallyStatus.ACTIVE, // active | inactive
    starter: {
      id: "cuid",
      nickname: "닉네임",
      profileImage: "프로필 이미지 링크",
    },
    kit: {
      // 스탬프 키트의 정보
      id: "cuid",
      title: "뫄뫄장르 솨솨캐릭 세트",
      description: "뫄뫄장르의 솨솨캐릭 세트입니다.",
      uploader: {
        id: "cuid",
        nickname: "닉네임",
        profileImage: "프로필이미지 링크",
      },
      boardImage: "스탬프 판 링크",
      stampImages: [
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      ],
      totalBlank: 5,
      thumbnailImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      rewardImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
      createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    },
    stamped: 1, // 찍은 스탬프 갯수
    createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  {
    id: "cuid",
    title: "1일 30분 러닝", // 유저가 설정한 목표
    description: "매일 아침 일어나자마자 30분 러닝하고 오기", // 유저가 설정한 세부 목표
    status: RallyStatus.ACTIVE, // active | inactive
    starter: {
      id: "cuid",
      nickname: "닉네임",
      profileImage: "프로필 이미지 링크",
    },
    kit: {
      // 스탬프 키트의 정보
      id: "cuid",
      title: "뫄뫄장르 솨솨캐릭 세트",
      description: "뫄뫄장르의 솨솨캐릭 세트입니다.",
      uploader: {
        id: "cuid",
        nickname: "닉네임",
        profileImage: "프로필이미지 링크",
      },
      boardImage: "스탬프 판 링크",
      stampImages: [
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      ],
      totalBlank: 5,
      thumbnailImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      rewardImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
      createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    },
    stamped: 3, // 찍은 스탬프 갯수
    createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  {
    id: "cuid",
    title: "1일 30분 러닝", // 유저가 설정한 목표
    description: "매일 아침 일어나자마자 30분 러닝하고 오기", // 유저가 설정한 세부 목표
    status: RallyStatus.ACTIVE, // active | inactive
    starter: {
      id: "cuid",
      nickname: "닉네임",
      profileImage: "프로필 이미지 링크",
    },
    kit: {
      // 스탬프 키트의 정보
      id: "cuid",
      title: "뫄뫄장르 솨솨캐릭 세트",
      description: "뫄뫄장르의 솨솨캐릭 세트입니다.",
      uploader: {
        id: "cuid",
        nickname: "닉네임",
        profileImage: "프로필이미지 링크",
      },
      boardImage: "스탬프 판 링크",
      stampImages: [
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      ],
      totalBlank: 5,
      thumbnailImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      rewardImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
      createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    },
    stamped: 1, // 찍은 스탬프 갯수
    createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
  {
    id: "cuid",
    title: "1일 30분 러닝", // 유저가 설정한 목표
    description: "매일 아침 일어나자마자 30분 러닝하고 오기", // 유저가 설정한 세부 목표
    status: RallyStatus.INACTIVE, // active | inactive
    starter: {
      id: "cuid",
      nickname: "닉네임",
      profileImage: "프로필 이미지 링크",
    },
    kit: {
      // 스탬프 키트의 정보
      id: "cuid",
      title: "뫄뫄장르 솨솨캐릭 세트",
      description: "뫄뫄장르의 솨솨캐릭 세트입니다.",
      uploader: {
        id: "cuid",
        nickname: "닉네임",
        profileImage: "프로필이미지 링크",
      },
      boardImage: "스탬프 판 링크",
      stampImages: [
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d349f604e7b0e6900f9ac53a43965300eb9a",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f5287469802eca457586a25a096fd31",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3499f17e489affba0627eb1eb39695f93dd",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d34915b3f4e3c2033bfd702a321ec6eda72c",
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      ],
      totalBlank: 5,
      thumbnailImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3498f324a0b9c48f77dbce3a43bd11ce785",
      rewardImage:
        "https://item.kakaocdn.net/do/46443c96b30704cce55911e75466d3494022de826f725e10df604bf1b9725cfd",
      tags: ["뫄뫄장르", "솨솨캐릭", "귀여운"],
      createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    },
    stamped: 5, // 찍은 스탬프 갯수
    createdAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ss.sssZ",
  },
];
