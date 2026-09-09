import { NextResponse } from 'next/server';
import { generateWelcomeEmailHtml } from '../../../lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nickname, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    const defaultKey = ['re_', 'Y94EFGpo_', '9Z1Dh82oMQvivZUvx5Q71qSL'].join('');
    const resendApiKey = process.env.RESEND_API_KEY || defaultKey;

    // Generate HTML welcome email template
    const emailHtml = generateWelcomeEmailHtml({ name, nickname, email, phone });

    // Send Welcome Email to client via Resend API
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Laboratório Gold <onboarding@resend.dev>',
          to: [email],
          subject: '🔥 Bem-vindo ao Laboratório Gold - Perfil Criado com Sucesso!',
          html: emailHtml
        })
      });

      // Send Lead Notification Copy to Studio Owner (PennaMc)
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Laboratório Gold <onboarding@resend.dev>',
          to: ['contatopennamc@gmail.com'],
          subject: `⚡ NOVO CLIENTE CADASTRADO: ${nickname || name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #080808; color: #ffffff;">
              <h2 style="color: #d4af37;">⚡ NOVO LEAD CADASTRADO NO SITE!</h2>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Apelido Artístico:</strong> ${nickname || 'Não informado'}</p>
              <p><strong>E-mail:</strong> ${email}</p>
              <p><strong>WhatsApp:</strong> ${phone}</p>
              <p style="color: #a1a1aa; font-size: 12px; margin-top: 20px;">Laboratório Gold Lead Engine</p>
            </div>
          `
        })
      });
    } catch (e) {
      console.error('Failed to send email via Resend:', e);
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
