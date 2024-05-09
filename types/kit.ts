import { User } from "./user";

export type Kit = {
  id: string;
  title: string;
  description: string;
  uploader: User;
  boardImage: string;
  stampImages: string[];
  totalBlank: number;
  thumbnailImage: string;
  rewardImage: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
};
