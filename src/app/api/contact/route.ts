import { NextResponse } from "next/server";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// حماية بسيطة من السبام: طلب كل 30 ثانية لكل IP
const lastHit = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const now = Date.now();
    if (now - (lastHit.get(ip) ?? 0) < 30_000) {
      return NextResponse.json(
        { error: "Please wait a moment before sending another message." },
        { status: 429 },
      );
    }

    const { name, email, message, company } = await req.json();

    // honeypot: الروبوتات بتعبي هالحقل المخفي
    if (company) return NextResponse.json({ ok: true });

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      name.trim().length < 2 ||
      message.trim().length < 10 ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
      return NextResponse.json(
        { error: "Server is not configured." },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New portfolio message from ${name.slice(0, 80)}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px">
            <h2 style="color:#7c3aed">New message from your portfolio</h2>
            <p><b>Name:</b> ${escapeHtml(name)}</p>
            <p><b>Email:</b> ${escapeHtml(email)}</p>
            <hr/>
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send." }, { status: 502 });
    }

    lastHit.set(ip, now);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
