// whatsapp.config.ts
export const WHATSAPP_CONFIG = {
  phoneNumber: '18298123753',
  messages: {
    initial: "Hi! I'm interested in booking a horseback riding experience 🐎",
  },
} as const;

export function buildWhatsAppURL(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
