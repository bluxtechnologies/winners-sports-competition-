import { NextResponse } from "next/server";
import { store } from "@/services/store";

export async function GET() {
  const payments = store.getPayments();
  return NextResponse.json({ success: true, data: payments });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.action === "verify") {
      store.verifyPayment(body.paymentId, body.verifiedByName || "Finance Officer", true);
      return NextResponse.json({ success: true });
    }
    if (body.action === "reject") {
      store.verifyPayment(body.paymentId, body.verifiedByName || "Finance Officer", false, body.reason);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 400 });
  }
}
