import { dummyRally } from "@/types/dummy";
import {
  PostRallyRequest,
  UpdateRallyRequest,
} from "@/types/requests/rallyRequest";
import {
  PostRallyResponse,
  SingleRallyResponse,
  UpdateRallyResponse,
} from "@/types/responses/rallyResponses";
import { NextResponse } from "next/server";

const rally = dummyRally;

export async function GET() {
  return NextResponse.json<SingleRallyResponse>({ rally });
}

export async function PATCH(request: UpdateRallyRequest) {
  return NextResponse.json<UpdateRallyResponse>({ rally });
}

export async function POST(request: PostRallyRequest) {
  return NextResponse.json<PostRallyResponse>({ rally });
}
