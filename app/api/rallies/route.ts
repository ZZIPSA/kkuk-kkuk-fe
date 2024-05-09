import { dummyRallies } from "@/types/dummy";
import { MultipleRallyResponse } from "@/types/responses/rallyResponses";
import { NextResponse } from "next/server";

const rallies = dummyRallies;

export async function GET() {
  return NextResponse.json<MultipleRallyResponse>({ rallies });
}
