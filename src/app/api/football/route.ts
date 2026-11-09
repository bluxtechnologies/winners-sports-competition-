import { NextResponse } from "next/server";
import { store } from "@/services/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "teams") {
    return NextResponse.json({ success: true, data: store.getTeams("e-football-001") });
  }

  return NextResponse.json({
    success: true,
    data: {
      matches: store.getMatches("e-football-001"),
      teams: store.getTeams("e-football-001"),
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.action === "update_match") {
      const match = store.updateMatch(body.match);
      return NextResponse.json({ success: true, data: match });
    }
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 400 });
  }
}
