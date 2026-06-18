import { Resend } from "resend";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return Response.json({ error: "invalid email" }, { status: 400 });
    }

    // Fail mềm: chưa có RESEND_API_KEY thì vẫn nhận lead, log lại, trả ok.
    if (!process.env.RESEND_API_KEY) {
      console.log(`[LEAD] ${email}`);
      return Response.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.NOTIFY_EMAIL || "luanqt.hanoi@gmail.com",
      subject: "New signup — MESSI HÀNH TRÌNH CUỐI",
      text: `New email signup: ${email}`,
    });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
