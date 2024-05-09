import { Kit } from "./kit";
import { User } from "./user";

export enum RallyStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type Rally = {
  id: string;
  title: string;
  description: string;
  status: RallyStatus;
  starter: User;
  kit: Kit;
  stamped: number;
  createdAt: string;
  updatedAt?: string;
};
