// whatsapp.config.ts
export const WHATSAPP_CONFIG = {
  phoneNumber: '18298123753',
  messages: {
    initial:
      'Hi Lux Punta Cana! I want to know more about the Horseback Riding 🐎',
  },
} as const;

export function buildWhatsAppURL(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
