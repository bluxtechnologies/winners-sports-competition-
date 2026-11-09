import { NextResponse } from "next/server";
import { store } from "@/services/store";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      categories: store.getRaceCategories("e-marathon-002"),
      participants: store.getParticipants("e-marathon-002"),
      results: store.getRaceResults("rc-10k"),
    },
  });
}
