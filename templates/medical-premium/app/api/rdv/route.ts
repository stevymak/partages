import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  birthdate: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  praticien: z.string().min(1).max(100),
  motif: z.string().min(1).max(100),
  type: z.enum(["cabinet", "teleconsultation"]),
  mutuelle: z.string().max(100).optional(),
});

const RATE = new Map<string, { n: number; ts: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const e = RATE.get(ip);
  if (e && now - e.ts < 60_000 && e.n >= 5)
    return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  RATE.set(ip, e && now - e.ts < 60_000 ? { n: e.n + 1, ts: e.ts } : { n: 1, ts: now });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 422 });

  // TODO: intégrer Doctolib API, Calendly ou système propriétaire
  // Les données médicales doivent être stockées sur hébergeur certifié HDS
  console.info("[RDV]", { praticien: parsed.data.praticien, motif: parsed.data.motif, type: parsed.data.type, ts: new Date().toISOString() });

  return NextResponse.json({ success: true }, { status: 200 });
}
