import type { Card } from "@/components/ui/card";

export interface Kit {
  id: number;
  title: string;
  description: string;
  uploader_id: number;
  board_image: string;
  stamp_images: string[];
  total_blank: number;
  thumbnail_image: string;
  reward_image: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface KitCardProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  kitId: number;
  title: string;
  description: string;
  thumbnail_image: string;
  tags: string[];
  uploader_id: number;
}
