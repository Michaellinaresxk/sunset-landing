// src/lib/email/index.ts
export { sendEmail } from './send';
export type { SendEmailParams } from './send';
export {
  customerConfirmationHtml,
  businessNotificationHtml,
} from './templates';
export type { BookingDetails } from './templates';
