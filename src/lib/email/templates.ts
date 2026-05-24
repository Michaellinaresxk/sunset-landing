// src/lib/email/templates.ts

export interface BookingDetails {
  customerEmail: string;
  bookingDate: string;
  pickupTime: string;
  pickupLocation: string;
  experience: string;
  adults: number;
  children: number;
  totalPaid: string;
  sessionId: string;
}

// ── Shared layout ─────────────────────────────────────────────

const layout = (title: string, body: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background:#0a0a0a; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
          ${body}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const header = (heading: string, subheading: string) => `
  <tr>
    <td style="background:linear-gradient(135deg,#f59e0b,#ea580c); padding:32px; border-radius:16px 16px 0 0; text-align:center;">
      <h1 style="margin:0 0 8px; font-size:24px; font-weight:300; color:#fff; letter-spacing:-0.5px;">
        ${heading}
      </h1>
      <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.85); font-weight:300;">
        ${subheading}
      </p>
    </td>
  </tr>
`;

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:14px; color:rgba(255,255,255,0.5);">${label}</td>
          <td style="font-size:14px; color:#fff; text-align:right; font-weight:500;">${value}</td>
        </tr>
      </table>
    </td>
  </tr>
`;

const detailsTable = (booking: BookingDetails) => `
  <table width="100%" cellpadding="0" cellspacing="0">
    ${detailRow('Experience', booking.experience === 'sunset' ? 'Sunset Experience' : 'Classic Ride')}
    ${detailRow('Date', booking.bookingDate)}
    ${detailRow('Pickup Time', booking.pickupTime)}
    ${detailRow('Pickup Location', booking.pickupLocation)}
    ${detailRow('Adults', String(booking.adults))}
    ${booking.children > 0 ? detailRow('Children (5-10y)', String(booking.children)) : ''}
    ${detailRow('Total Paid', booking.totalPaid)}
  </table>
`;

// ── Customer confirmation ─────────────────────────────────────

export const customerConfirmationHtml = (booking: BookingDetails): string =>
  layout(
    'Booking Confirmed',
    `
    ${header('Booking Confirmed ✓', 'Horseback Riding — Punta Cana')}
    <tr>
      <td style="background:#18181b; padding:32px; border-radius:0 0 16px 16px; border:1px solid rgba(255,255,255,0.05); border-top:none;">
        <p style="font-size:15px; color:rgba(255,255,255,0.6); line-height:1.6; margin:0 0 24px; font-weight:300;">
          Thank you for your booking! Here are your experience details:
        </p>

        ${detailsTable(booking)}

        <div style="margin:24px 0; padding:16px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:12px;">
          <p style="margin:0; font-size:13px; color:rgba(255,255,255,0.5); line-height:1.5;">
            <strong style="color:rgb(52,211,153);">Free cancellation</strong>
            up to 24 hours before the experience.
          </p>
        </div>

        <p style="font-size:13px; color:rgba(255,255,255,0.3); margin:24px 0 0;">
          Reference: ${booking.sessionId}
        </p>

        <div style="margin:32px 0 0; padding-top:24px; border-top:1px solid rgba(255,255,255,0.05);">
          <p style="margin:0; font-size:13px; color:rgba(255,255,255,0.3); text-align:center;">
            Questions? Reply to this email or contact us at info@luxpuntacana.com
          </p>
        </div>
      </td>
    </tr>
    `,
  );

// ── Business notification ─────────────────────────────────────

export const businessNotificationHtml = (booking: BookingDetails): string =>
  layout(
    'New Booking',
    `
    ${header('New Booking Received', `From ${booking.customerEmail}`)}
    <tr>
      <td style="background:#18181b; padding:32px; border-radius:0 0 16px 16px; border:1px solid rgba(255,255,255,0.05); border-top:none;">
        ${detailsTable(booking)}

        ${detailRow('Customer Email', booking.customerEmail)}

        <p style="font-size:13px; color:rgba(255,255,255,0.3); margin:24px 0 0;">
          Stripe Session: ${booking.sessionId}
        </p>
      </td>
    </tr>
    `,
  );
