// types/responses/rallyResponses.ts
import { Rally } from "../rally";

export type UpdateRallyRequest = Pick<Rally, "stamped">;

export type PostRallyRequest = Rally;
