import { CartItem } from '../types';
import { UserProfile } from '../context/AuthContext';

export const WHATSAPP_NUMBER = "5522998550323"; // (22) 998550323
export const WHATSAPP_QR_LINK = "https://wa.me/qr/Z474DNBSX53YF1";

export function generateWhatsAppCheckoutUrl(
  cartItems: CartItem[],
  totalPrice: number,
  discountAmount: number = 0,
  user?: UserProfile | null
) {
  const finalPrice = Math.max(0, totalPrice - discountAmount);
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let text = `📋 *COMPROVANTE DE PEDIDO — LABORATÓRIO GOLD*\n`;
  text += `📅 *Data*: ${dateStr}\n`;
  text += `----------------------------------\n\n`;

  if (user) {
    text += `👤 *CLIENTE CADASTRADO*:\n`;
    text += `   • *Nome*: ${user.name}\n`;
    text += `   • *E-mail*: ${user.email}\n`;
    text += `   • *WhatsApp*: ${user.phone}\n`;
    text += `----------------------------------\n\n`;
  }

  text += `🛒 *ITENS DO PEDIDO*:\n\n`;

  cartItems.forEach((item, index) => {
    text += `${index + 1}. *${item.title}*\n`;
    text += `   • *Tipo*: ${item.itemType.toUpperCase()}\n`;
    if (item.licenseType) {
      text += `   • *Licença Escolhida*: ${item.licenseType}\n`;
    }
    if (item.size) {
      text += `   • *Tamanho*: ${item.size}\n`;
    }
    text += `   • *Valor*: R$ ${item.price.toFixed(0)},00\n\n`;
  });

  text += `----------------------------------\n`;
  text += `💰 *Subtotal*: R$ ${totalPrice.toFixed(0)},00\n`;
  if (discountAmount > 0) {
    text += `🎁 *Desconto*: - R$ ${discountAmount.toFixed(0)},00\n`;
  }
  text += `🔥 *VALOR TOTAL*: *R$ ${finalPrice.toFixed(0)},00*\n`;
  text += `💳 *Forma de Pagamento*: PIX ou CARTÃO\n`;
  text += `----------------------------------\n\n`;
  text += `Olá @originalpenna! Sou ${user ? user.name : 'cliente do site'}, registrei meu pedido acima e quero finalizar o pagamento para receber os arquivos do meu pedido.`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function generateSingleBeatWhatsAppUrl(
  beatTitle: string,
  licenseName: string,
  licensePrice: number,
  bpm?: number,
  key?: string,
  user?: UserProfile | null
) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let text = `📋 *COMPROVANTE DE PEDIDO — LABORATÓRIO GOLD*\n`;
  text += `📅 *Data*: ${dateStr}\n`;
  text += `----------------------------------\n\n`;

  if (user) {
    text += `👤 *CLIENTE CADASTRADO*:\n`;
    text += `   • *Nome/Artístico*: ${user.name}\n`;
    text += `   • *E-mail*: ${user.email}\n`;
    text += `   • *WhatsApp*: ${user.phone}\n`;
    text += `----------------------------------\n\n`;
  }

  text += `🎵 *BEAT SELECIONADO*: *${beatTitle}*\n`;
  if (bpm && key) {
    text += `🎹 *ESPECIFICAÇÕES*: ${bpm} BPM • ${key}\n`;
  }
  text += `📜 *LICENÇA ESCOLHIDA*: *${licenseName.toUpperCase()}*\n`;
  text += `💰 *VALOR TOTAL*: *R$ ${licensePrice.toFixed(0)},00*\n`;
  text += `💳 *FORMA DE PAGAMENTO*: PIX ou CARTÃO\n\n`;
  text += `----------------------------------\n`;
  text += `Olá @originalpenna! Sou ${user ? user.name : 'cliente do site'}, selecionei o plano acima e quero finalizar o pagamento para receber os arquivos imediatamente.`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function generateSingleStarterWhatsAppUrl(
  starterTitle: string,
  licenseName: string,
  licensePrice: number,
  bpm?: number,
  key?: string,
  user?: UserProfile | null
) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let text = `📋 *COMPROVANTE DE PEDIDO — LABORATÓRIO GOLD*\n`;
  text += `📅 *Data*: ${dateStr}\n`;
  text += `----------------------------------\n\n`;

  if (user) {
    text += `👤 *CLIENTE CADASTRADO*:\n`;
    text += `   • *Nome/Artístico*: ${user.name}\n`;
    text += `   • *E-mail*: ${user.email}\n`;
    text += `   • *WhatsApp*: ${user.phone}\n`;
    text += `----------------------------------\n\n`;
  }

  text += `🎹 *STARTER SELECIONADO*: *${starterTitle}*\n`;
  if (bpm || key) {
    text += `🎼 *ESPECIFICAÇÕES*: ${bpm ? bpm + ' BPM' : ''} ${key ? '• Tom: ' + key : ''}\n`;
  }
  text += `📜 *OPÇÃO ESCOLHIDA*: *${licenseName.toUpperCase()}*\n`;
  text += `💰 *VALOR TOTAL*: *R$ ${licensePrice.toFixed(0)},00*\n`;
  text += `💳 *FORMA DE PAGAMENTO*: PIX ou CARTÃO\n\n`;
  text += `----------------------------------\n`;
  text += `Olá @originalpenna! Sou ${user ? user.name : 'cliente do site'}, selecionei a opção acima para este Starter e quero finalizar o pagamento para receber os arquivos do projeto.`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
