import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, age, email, social } = await request.json();

  if (!name || !age || !email || !social) {
    return NextResponse.json(
      { error: "Faltan campos requeridos." },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "Bermejo <hola@bermejocult.com>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nueva solicitud de Private Community — ${name}`,
      html: `
        <div style="font-family: sans-serif; font-size: 14px; color: #1a1a1a;">
          <h2 style="margin-bottom: 16px;">Nueva solicitud — Private Community</h2>
          <table cellpadding="8" style="border-collapse: collapse;">
            <tr>
              <td style="font-weight: bold; border-bottom: 1px solid #eee;">Nombre</td>
              <td style="border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; border-bottom: 1px solid #eee;">Edad</td>
              <td style="border-bottom: 1px solid #eee;">${age}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; border-bottom: 1px solid #eee;">Correo electrónico</td>
              <td style="border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; border-bottom: 1px solid #eee;">Red social principal</td>
              <td style="border-bottom: 1px solid #eee;">${social}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar correo de Private Community:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el correo." },
      { status: 500 }
    );
  }
}
