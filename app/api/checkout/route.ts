import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_PROVIDER } from '@/src/lib/payments/types';
import { getPaymentProvider } from '@/src/lib/payments/registry';
import type { BookingFormData } from '@/src/types';
import {
  buildLineItems,
  buildCheckoutMetadata,
} from '@/src/lib/checkout-builder';

export async function POST(request: NextRequest) {
  try {
    const { formData } = (await request.json()) as {
      formData: BookingFormData;
    };

    // ── Validate ──────────────────────────────────────────────
    if (!formData.date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const totalParticipants =
      formData.adults + formData.children + formData.infants;
    if (totalParticipants === 0) {
      return NextResponse.json(
        { error: 'At least one participant is required' },
        { status: 400 },
      );
    }

    // ── Build checkout params ─────────────────────────────────
    const origin = request.nextUrl.origin;
    const lineItems = buildLineItems(formData);
    const metadata = buildCheckoutMetadata(formData);

    // ── Create session via provider (controlled by PAYMENT_PROVIDER env var) ──
    const provider = getPaymentProvider(DEFAULT_PROVIDER);
    const { checkoutUrl, sessionId } = await provider.createCheckoutSession({
      lineItems,
      metadata,
      successUrl: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/booking/cancel`,
    });

    return NextResponse.json({ checkoutUrl, sessionId });
  } catch (error) {
    console.error('[checkout] Error creating session:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Failed to create checkout session';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
