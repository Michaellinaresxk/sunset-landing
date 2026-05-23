import Stripe from 'stripe';
import type {
  PaymentProvider,
  CreateCheckoutParams,
  CheckoutResult,
} from './types';

const getStripeClient = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY env variable');
  return new Stripe(key);
};

export const stripeProvider: PaymentProvider = {
  name: 'stripe',

  async createCheckoutSession(
    params: CreateCheckoutParams,
  ): Promise<CheckoutResult> {
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: params.lineItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.unitAmountCents,
        },
        quantity: item.quantity,
      })),
      metadata: params.metadata,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    });

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL');
    }

    return { checkoutUrl: session.url, sessionId: session.id };
  },
};
