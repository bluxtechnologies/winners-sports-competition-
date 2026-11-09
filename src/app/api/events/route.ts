import { NextResponse } from "next/server";
import { store } from "@/services/store";

export async function GET() {
  const events = store.getEvents();
  return NextResponse.json({ success: true, data: events });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const event = store.updateEvent(body);
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update event" }, { status: 400 });
  }
}
