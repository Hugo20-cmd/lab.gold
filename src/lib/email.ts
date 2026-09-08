export interface RegisterEmailPayload {
  name: string;
  nickname?: string;
  email: string;
  phone: string;
}

export function generateWelcomeEmailHtml(data: RegisterEmailPayload): string {
  const displayName = data.nickname || data.name;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bem-vindo ao Laboratório Gold</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #080808; color: #f4f4f5; margin: 0; padding: 20px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #111115; border: 1px solid #d4af37; border-radius: 16px; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="padding: 30px; text-align: center; background: linear-gradient(135deg, #1c180b 0%, #0a0a0d 100%); border-bottom: 1px solid #332709;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">
          LABORATÓRIO GOLD
        </h1>
        <p style="color: #a1a1aa; font-size: 12px; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">
          Sound Lab & Produção Musical
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">
          SALVE, ${displayName.toUpperCase()}! 👋
        </h2>

        <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6;">
          Seu perfil no <strong>Laboratório Gold</strong> foi criado com sucesso! É uma honra ter você conectado com a nossa produção autêntica e independente.
        </p>

        <!-- Summary Box -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #18181f; border: 1px solid #27272a; border-radius: 12px; margin: 20px 0; padding: 15px;">
          <tr>
            <td>
              <p style="margin: 5px 0; color: #d4af37; font-size: 12px; font-weight: bold;">RESUMO DO SEU PERFIL:</p>
              <p style="margin: 3px 0; color: #ffffff; font-size: 13px;"><strong>Nome:</strong> ${data.name}</p>
              ${data.nickname ? `<p style="margin: 3px 0; color: #ffffff; font-size: 13px;"><strong>Apelido Artístico:</strong> ${data.nickname}</p>` : ''}
              <p style="margin: 3px 0; color: #ffffff; font-size: 13px;"><strong>E-mail:</strong> ${data.email}</p>
              <p style="margin: 3px 0; color: #ffffff; font-size: 13px;"><strong>WhatsApp:</strong> ${data.phone}</p>
            </td>
          </tr>
        </table>

        <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6;">
          A partir de agora, suas compras de instrumentais, licenças e starters ficam associadas diretamente ao seu WhatsApp e nota fiscal.
        </p>

        <!-- CTA Button -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 25px;">
          <tr>
            <td align="center">
              <a href="https://laboratorio-gold.vercel.app/beats" style="background: linear-gradient(135deg, #f5d77f 0%, #d4af37 50%, #aa7c11 100%); color: #000000; text-decoration: none; font-weight: bold; font-size: 14px; padding: 14px 28px; border-radius: 10px; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                EXPLORAR O CATÁLOGO DE BEATS
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #08080a; border-top: 1px solid #27272a; color: #71717a; font-size: 11px;">
        <p style="margin: 0;">Produção Musical por <strong>@originalpenna</strong> • Rio de Janeiro / RJ</p>
        <p style="margin: 5px 0 0 0;">Laboratório Gold — Transformando ideias em som.</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
