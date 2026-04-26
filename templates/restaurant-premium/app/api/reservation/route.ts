import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.string(),
  message: z.string().max(500).optional(),
});

const RATE = new Map<string, { n: number; ts: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const e = RATE.get(ip);
  if (e && now - e.ts < 60_000 && e.n >= 3)
    return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  RATE.set(ip, e && now - e.ts < 60_000 ? { n: e.n + 1, ts: e.ts } : { n: 1, ts: now });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 422 });

  // TODO: connecter email (Resend) + SMS (Twilio) + calendrier (Google Calendar API)
  console.info("[Reservation]", { ...parsed.data, ip, ts: new Date().toISOString() });

  return NextResponse.json({ success: true }, { status: 200 });
}
