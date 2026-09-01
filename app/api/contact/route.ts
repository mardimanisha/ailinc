import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "manisha@ailinc.com";

export async function POST(req: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP env vars are not fully configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  let body: { name?: string; contact?: string; need?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const contact = (body.contact ?? "").trim();
  const need = (body.need ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!name || !contact || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: SMTP_USER,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New scope request from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${contact}`,
        `Email: ${email}`,
        `What they want to build: ${need || "(not provided)"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
