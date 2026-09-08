import { NextResponse } from 'next/server';
import { generateWelcomeEmailHtml } from '../../../lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nickname, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Generate HTML welcome email template
    const emailHtml = generateWelcomeEmailHtml({ name, nickname, email, phone });

    // Send email via Resend API if API key configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Laboratório Gold <onboarding@resend.dev>',
            to: [email],
            subject: '🔥 Bem-vindo ao Laboratório Gold - Perfil Criado com Sucesso!',
            html: emailHtml
          })
        });
      } catch (e) {
        console.error('Failed to send email via Resend:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cadastro registrado com sucesso e e-mail enviado!',
      user: { name, nickname, email, phone }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro no servidor' }, { status: 500 });
  }
}
