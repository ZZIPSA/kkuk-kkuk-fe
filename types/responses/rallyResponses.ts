// types/responses/rallyResponses.ts
import { Rally } from "../rally";

export type SingleRallyResponse = {
  rally: Rally | null;
};

export type UpdateRallyResponse = {
  rally: Rally;
};

export type MultipleRallyResponse = {
  rallies: Rally[] | null;
};

export type PostRallyResponse = { rally: Rally };
