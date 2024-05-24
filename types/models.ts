import type { Prisma, VerificationToken } from '@prisma/client';
export { RallyStatus } from '@prisma/client';

export type UserModel = Prisma.UserGetPayload<{ include: { accounts: true; sessions: true; kits: true; rallies: true } }>;
export type AccountModel = Prisma.AccountGetPayload<{ include: { user: true } }>;
export type SessionModel = Prisma.SessionGetPayload<{ include: { user: true } }>;
export type VerificationTokenModel = VerificationToken;
export type KitModel = Prisma.KitGetPayload<{ include: { uploader: true; stamps: true; rallies: true } }>;
export type StampModel = Prisma.StampGetPayload<{ include: { kit: true } }>;
export type RallyModel = Prisma.RallyGetPayload<{ include: { kit: true; starter: true } }>;
