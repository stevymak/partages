import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1).max(100),
  message: z.string().min(10).max(2000),
  urgency: z.boolean().optional(),
});

const RATE_LIMIT_MAP = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (entry && now - entry.ts < WINDOW_MS) {
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 }
      );
    }
    entry.count++;
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, ts: now });
  }

  // Parse + validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, phone, service, message, urgency } = parsed.data;

  /*
   * INTÉGRATION EMAIL — connecter ici votre provider :
   *
   * Option A — Resend (recommandé) :
   *   import { Resend } from "resend";
   *   const resend = new Resend(process.env.RESEND_API_KEY);
   *   await resend.emails.send({ from, to, subject, html });
   *
   * Option B — Nodemailer + SMTP :
   *   const transport = nodemailer.createTransport({ ... });
   *   await transport.sendMail({ ... });
   *
   * Option C — Brevo / SendGrid via API REST
   */

  console.info("[Contact]", {
    name,
    email,
    phone,
    service,
    urgency,
    messageLength: message.length,
    ip,
    ts: new Date().toISOString(),
  });

  return NextResponse.json(
    { success: true, message: "Message reçu. Nous vous répondons sous 2h." },
    { status: 200 }
  );
}
