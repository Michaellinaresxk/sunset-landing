// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  sendEmail,
  customerConfirmationHtml,
  businessNotificationHtml,
  type BookingDetails,
} from '@/src/lib/email';

const BUSINESS_EMAIL = 'info@luxpuntacana.com';

// ── Stripe client ─────────────────────────────────────────────

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key);
};

const getWebhookSecret = () => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('Missing STRIPE_WEBHOOK_SECRET');
  return secret;
};

// ── Extract booking details from Stripe session ───────────────

const extractBookingDetails = (
  session: Stripe.Checkout.Session,
): BookingDetails => {
  const meta = session.metadata ?? {};
  const totalCents = session.amount_total ?? 0;

  return {
    customerEmail: session.customer_details?.email ?? 'unknown',
    bookingDate: meta.bookingDate ?? 'N/A',
    pickupTime: meta.pickupTime ?? 'N/A',
    pickupLocation: meta.pickupLocation ?? 'N/A',
    experience: meta.experience ?? 'sunset',
    adults: Number(meta.adults) || 0,
    children: Number(meta.children) || 0,
    totalPaid: `$${(totalCents / 100).toFixed(2)}`,
    sessionId: session.id,
  };
};

// ── Send both confirmation emails ─────────────────────────────

const sendBookingEmails = async (booking: BookingDetails): Promise<void> => {
  const customerSubject = `Booking Confirmed — ${booking.bookingDate}`;
  const businessSubject = `New Booking: ${booking.customerEmail} — ${booking.bookingDate}`;

  await Promise.all([
    sendEmail({
      to: booking.customerEmail,
      subject: customerSubject,
      html: customerConfirmationHtml(booking),
    }),
    sendEmail({
      to: BUSINESS_EMAIL,
      subject: businessSubject,
      html: businessNotificationHtml(booking),
    }),
  ]);
};

// ── Webhook handler ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret());
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    console.error('[webhook] Signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // ── Handle checkout.session.completed ─────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process paid sessions
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true });
    }

    const booking = extractBookingDetails(session);

    try {
      await sendBookingEmails(booking);
      console.log('[webhook] Confirmation emails sent:', booking.customerEmail);
    } catch (err) {
      // Log but don't fail the webhook — Stripe would retry
      console.error('[webhook] Email send failed:', err);
    }
  }

  return NextResponse.json({ received: true });
}
