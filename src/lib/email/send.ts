// src/lib/email/send.ts
import { Resend } from 'resend';

const getResendClient = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('Missing RESEND_API_KEY env variable');
  return new Resend(key);
};

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

const FROM_ADDRESS = 'Lux Punta Cana <bookings@luxpuntacana.com>';

export const sendEmail = async (params: SendEmailParams): Promise<void> => {
  const resend = getResendClient();

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: Array.isArray(params.to) ? params.to : [params.to],
    subject: params.subject,
    html: params.html,
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }
};
